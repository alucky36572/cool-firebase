import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import Highcharts from "highcharts";
import more from "highcharts/highcharts-more";
more(Highcharts);

function Scatter() {
    const [postsData, setPostsData] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsSnapshot = await firebase.firestore()
                    .collection("posts")
                    .get();
                const posts = postsSnapshot.docs.map(doc => ({
                    topic: doc.data().topic,
                    level: parseFloat(doc.data().level) // 確保 level 是數值
                }));
                setPostsData(posts); // 將獲取的資料設置到 state
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    // 將 topic 轉換為對應的數字
    const topicMap = {
        "樂樂": 0,
        "憂憂": 1,
        "怒怒": 2,
        "厭厭": 3,
        "驚驚": 4
    };

    // 定義每個情緒對應的顏色
    const colorMap = {
        "樂樂": '#FFD700', // 黃色
        "憂憂": '#1E90FF', // 藍色
        "怒怒": '#FF4500', // 紅色
        "厭厭": '#32CD32', // 綠色
        "驚驚": '#9370DB'  // 紫色
    };

    // 統計情緒和程度的數量
    const countMap = {};
    postsData.forEach(post => {
        const key = `${post.topic}-${post.level}`;
        if (countMap[key]) {
            countMap[key]++;
        } else {
            countMap[key] = 1;
        }
    });

    // 數據轉換成 Highcharts 所需的格式
    const dataset = postsData.map(post => ({
        x: topicMap[post.topic], // x 軸 - topic
        y: post.level, // y 軸 - level
        z: countMap[`${post.topic}-${post.level}`], // 泡泡大小
        color: colorMap[post.topic] // 點的顏色
    }));

    // 計算趨勢線的函數
    function getTrendLine(data) {
        const n = data.length;
        let sumX = 0,
            sumY = 0,
            sumXY = 0,
            sumX2 = 0;

        // 計算線性回歸所需的和
        for (let i = 0; i < n; i++) {
            const { x, y } = data[i];
            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumX2 += x ** 2;
        }

        // 計算趨勢線的斜率
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
        // 計算趨勢線的截距
        const intercept = (sumY - slope * sumX) / n;
        const trendline = [];

        // 找出數據中的最小和最大 x 值
        const minX = Math.min(...data.map(({ x }) => x));
        const maxX = Math.max(...data.map(({ x }) => x));

        // 根據斜率和截距計算對應的 y 值
        trendline.push([minX, minX * slope + intercept]);
        trendline.push([maxX, maxX * slope + intercept]);

        return trendline;
    }

    // 初始化 Highcharts
    useEffect(() => {
        if (dataset.length > 0) {
            Highcharts.chart('scatter', {
                chart: {
                    type: 'bubble',
                    marginLeft: 150, 
                    marginRight: 100, 
                    marginBottom: 110,
                    marginTop: 100
                },
                title: {
                    text: '留言板情緒分布圖',
                    style: {
                        fontSize: '2rem',
                        color: '#ef870c'
                    }
                },
                xAxis: {
                    min: -0.2, // 調整 x 軸最小值，避免泡泡被切到
                    max: 4,
                    title: {
                        text: '情緒角色',
                        style: {
                            fontSize: '2rem',
                            fontWeight:'bold'
                        }
                    },
                    categories: ['樂樂', '憂憂', '怒怒', '厭厭', '驚驚'], 
                    labels: {
                        style: {
                            fontSize: '1.5rem' 
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    max: 5.1, 
                    tickInterval: 1,
                    title: {
                        text: '情緒程度',
                        style: {
                            fontSize: '2rem',
                            fontWeight:'bold' 
                        }
                    },
                    labels: {
                        style: {
                            fontSize: '1.5rem' 
                        }
                    }
                },
                tooltip: {
                    style: {
                        fontSize: '1.5rem' // 調整 hover 提示框的字體大小
                    }
                },
                series: [{
                    type: 'line',
                    name: '趨勢線',
                    data: getTrendLine(dataset),
                    marker: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            lineWidth: 0
                        }
                    },
                    enableMouseTracking: false
                }, {
                    type: 'bubble',
                    name: '分布點',
                    data: dataset,
                    marker: {
                        radius: 8 // 增加泡泡的大小
                    }
                }]
            });
        }
    }, [dataset]);
    

    return (
        <div id="scatter"></div>
    );
}

export default Scatter;
