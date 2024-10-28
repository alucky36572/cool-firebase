import { Item } from "semantic-ui-react";
import { useEffect, useRef, useState } from "react";
import firebase from "../utils/firebase";
import Post from "../components/Post";
import { useLocation } from "react-router-dom";
import { Waypoint } from 'react-waypoint';

function Posts() {
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const currentTopic = urlSearchParams.get("topic");
    const [posts, setPosts] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false); // 控制加載更多的狀態
    const lastPostSnapshotRef = useRef(null); // 使用 `null` 作為初始值

    // 初始載入貼文
    useEffect(() => {
        const fetchPosts = () => {
            let query = firebase
                .firestore()
                .collection("posts")
                .orderBy('createdAt', 'desc')
                .limit(5);

            // 如果有指定的 `currentTopic`，根據 topic 過濾查詢
            if (currentTopic) {
                query = query.where("topic", "==", currentTopic);
            }

            query
                .get()
                .then((collectionSnapshot) => {
                    const data = collectionSnapshot.docs.map((docSnapshot) => {
                        const id = docSnapshot.id;
                        return { ...docSnapshot.data(), id };
                    });

                    // 設置最後一篇貼文的 snapshot
                    lastPostSnapshotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1];

                    setPosts(data);
                })
                .catch((error) => {
                    console.error("Error fetching posts: ", error);
                });
        };

        // 呼叫 fetchPosts 來抓取資料
        fetchPosts();
    }, [currentTopic]);

    // 加載更多貼文的邏輯
    const loadMorePosts = () => {
        if (loadingMore || !lastPostSnapshotRef.current) return; // 避免重複加載
        setLoadingMore(true);

        let query = firebase
            .firestore()
            .collection("posts")
            .orderBy('createdAt', 'desc')
            .startAfter(lastPostSnapshotRef.current)
            .limit(5);

        if (currentTopic) {
            query = query.where("topic", "==", currentTopic);
        }

        query
            .get()
            .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map((docSnapshot) => {
                    const id = docSnapshot.id;
                    return { ...docSnapshot.data(), id };
                });

                // 設置新的最後一篇貼文的 snapshot
                if (collectionSnapshot.docs.length > 0) {
                    lastPostSnapshotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                }

                // 使用函數式的 `setPosts`，避免閉包問題
                setPosts((prevPosts) => [...prevPosts, ...data]);
                setLoadingMore(false);
            })
            .catch((error) => {
                console.error("Error loading more posts: ", error);
                setLoadingMore(false);
            });
    };

    return (
        <>
            <Item.Group>
                {posts.map(post => (
                    <Post post={post} key={post.id} />
                ))}
            </Item.Group>

            {/* Waypoint 用於偵測滾動到底部時加載更多 */}
            <Waypoint onEnter={loadMorePosts} />

            {/* 加載更多時顯示的指示器 */}
            {loadingMore && <div>載入中...</div>}
        </>
    );
}

export default Posts;
