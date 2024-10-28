import nat1 from '../img/nat-1.jpg';
import nat2 from '../img/nat-2.jpg';
import nat3 from '../img/nat-3.jpg';
import nat1lg from '../img/nat-1-large.jpg';
import nat2lg from '../img/nat-2-large.jpg';
import nat3lg from '../img/nat-3-large.jpg';
import nat8 from '../img/nat-8.jpg';
import nat9 from '../img/nat-9.jpg';
import video1 from '../img/video.mp4';
import video2 from '../img/video.webm';
import MoveInWidth from "../components/MoveInWidth";
import TestComponent from "../components/TestComponent";
import Scatter from '../components/Scatter';
import { Link } from 'react-router-dom';



export default function Index({ user }) {
    return (
        <>
            <div className="index">
                <div className="index__text-box">
                    <h1 className="heading-primary">
                        <span className="heading-primary--main">你會認知情緒嗎?</span>
                        <span className="heading-primary--sub">幫助情緒管理的好幫手</span>
                    </h1>

                    <a href="#section-tours" className="btn btn--white btn--animated">探索情緒</a>
                </div>
            </div>

            <main>
                <section className="section-about">
                    <div className="u-center-text u-margin-bottom-big">
                        <h2 className="heading-secondary">
                            分享你的心情，管理你的情緒
                        </h2>
                    </div>

                    <div className="row">
                        <div className="col-1-of-2">
                            <h3 className="heading-tertiary u-margin-bottom-small">探索你的內心情感，提升情緒覺察力</h3>
                            <p className="paragraph">
                                你知道情緒是如何影響你的生活嗎？透過情緒分析，你將清楚看到自己的情緒變化，這不僅能幫助更深入了解自己，還能提升情緒管理的能力。無論是面對壓力或挑戰，覺察情緒是邁向心理健康的重要一步。
                            </p>

                            <h3 className="heading-tertiary u-margin-bottom-small">情緒留言板—舒壓與情緒管理的最佳工具</h3>
                            <p className="paragraph">
                                生活壓力無處不在，我們提供了一個平台<span className='highlight'>只要註冊/登入會員</span>，讓你可以在此抒發壓力、釋放情緒。幫助分類與識別自己的情緒狀態，從而更有針對性地進行自我調整。
                            </p>

                            {user ? (
                                <Link to="/posts" className="btn-text">情緒留言板 &rarr;</Link>
                            ) : (
                                <Link to="/signin" className="btn-text">登入分享情緒 &rarr;</Link>
                            )}


                        </div>
                        <div className="col-1-of-2">
                            <div className="composition">

                                <img
                                    // srcset="img/nat-1.jpg 300w, img/nat-1-large.jpg 1000w"
                                    sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                                    alt="Photo 1"
                                    className="composition__photo composition__photo--p1"
                                    src={nat1lg} />

                                <img
                                    // srcset="img/nat-2.jpg 300w, img/nat-2-large.jpg 1000w"
                                    sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                                    alt="Photo 2"
                                    className="composition__photo composition__photo--p2"
                                    src={nat2lg} />

                                <img
                                    // srcset="img/nat-3.jpg 300w, img/nat-3-large.jpg 1000w"
                                    sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                                    alt="Photo 3"
                                    className="composition__photo composition__photo--p3"
                                    src={nat3lg} />
                            </div>
                        </div>
                    </div>
                </section>

                <MoveInWidth displayed={<TestComponent />} />
                <div className="u-center-text u-margin-bottom-big">
                    <h2 className="heading-secondary heading-secondary__insideout">
                        認識你的心情小隊，和情緒一起冒險
                    </h2>
                </div>
                <div className="row">
                    <div className="col-1-of-1">
                        <h3 className="heading-tertiary u-margin-bottom-small heading-tertiary__insideout">探索你的內心情感，提升情緒覺察力</h3>
                        <p className="paragraph">
                            在每個人的大腦裡，都有一支情緒小隊，就像《腦筋急轉彎》裡的那些角色一樣：樂樂帶來快樂、怒怒引發憤怒、厭厭告訴我們該避開什麼、驚驚讓我們感到害怕、憂憂讓我們接受痛苦。透過我們的平台，可以和這些情緒小隊一起探索內心的感受，並找到情緒的平衡點。分享你的心情，幫助辨別這些情緒角色何時出現，從而更好地管理情緒。
                        </p>
                    </div>
                </div>

                <Scatter />

                <section className="section-tours" id="section-tours">
                    <div className="u-center-text u-margin-bottom-big">
                        <h2 className="heading-secondary">
                            熱門講座課程
                        </h2>
                    </div>

                    <div className="row">
                        <div className="col-1-of-3">
                            <div className="card">
                                <div className="card__side card__side--front">
                                    <div className="card__picture card__picture--1">
                                        &nbsp;
                                    </div>
                                    <h4 className="card__heading">
                                        <span className="card__heading-span card__heading-span--1">情緒管理與壓力紓解技巧</span>
                                    </h4>
                                    <div className="card__details">
                                        <ul>
                                            <li>2024/11/15 14:00-17:00</li>
                                            <li>人數限制：30 人</li>
                                            <li>講座特色：講座將包括冥想、深呼吸練習和行為認知調整</li>
                                            <li>適合對象：適合所有因工作或生活壓力感到焦慮、煩躁的人</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card__side card__side--back card__side--back-1">
                                    <div className="card__cta">
                                        <div className="card__price-box">
                                            <p className="card__price-only">Only</p>
                                            <p className="card__price-value">$200</p>
                                        </div>
                                        <a href="#popup" className="btn btn--white">立即報名!</a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-1-of-3">
                            <div className="card">
                                <div className="card__side card__side--front">
                                    <div className="card__picture card__picture--2">
                                        &nbsp;
                                    </div>
                                    <h4 className="card__heading">
                                        <span className="card__heading-span card__heading-span--2">情緒智商提升工作坊</span>
                                    </h4>
                                    <div className="card__details">
                                        <ul>
                                            <li>2024/12/2 10:00-16:00</li>
                                            <li>人數限制：20人</li>
                                            <li>講座特色：透過情境模擬，更好地處理衝突和建立人際關係</li>
                                            <li>適合對象：適合希望增進情緒理解和人際互動能力的人士</li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="card__side card__side--back card__side--back-2">
                                    <div className="card__cta">
                                        <div className="card__price-box">
                                            <p className="card__price-only">Only</p>
                                            <p className="card__price-value">$400</p>
                                        </div>
                                        <a href="#popup" className="btn btn--white">立即報名!</a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-1-of-3">
                            <div className="card">
                                <div className="card__side card__side--front">
                                    <div className="card__picture card__picture--3">
                                        &nbsp;
                                    </div>
                                    <h4 className="card__heading">
                                        <span className="card__heading-span card__heading-span--3">兒童與青少年的情緒管理</span>
                                    </h4>
                                    <div className="card__details">
                                        <ul>
                                            <li>2024/12/10 13:00-16:00</li>
                                            <li>人數限制：25人</li>
                                            <li>講座特色：幫助孩子識別、表達及管理情緒，促進心理健康</li>
                                            <li>適合對象：適合家長、老師及心理健康工作的專業人士。</li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="card__side card__side--back card__side--back-3">
                                    <div className="card__cta">
                                        <div className="card__price-box">
                                            <p className="card__price-only">Only</p>
                                            <p className="card__price-value">$600</p>
                                        </div>
                                        <a href="#popup" className="btn btn--white">立即報名!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="u-center-text u-margin-top-huge">
                        <a href="#" className="btn btn--green">Discover all tours</a>
                    </div> */}
                </section>

                <section className="section-stories">
                    <div className="bg-video">
                        <video className="bg-video__content" autoPlay muted loop>
                            <source src={video1} type="video/mp4" />
                            <source src={video2} type="video/webm" />
                            Your browser is not supported!
                        </video>
                    </div>

                    <div className="u-center-text u-margin-bottom-big">
                        <h2 className="heading-secondary">
                            創辦人的故事
                        </h2>
                    </div>

                    <div className="row">
                        <div className="story">
                            <figure className="story__shape">
                                <img src={nat8} alt="Person on a tour" className="story__img" />
                                <figcaption className="story__caption">Mary</figcaption>
                            </figure>
                            <div className="story__text">
                                <h3 className="heading-tertiary u-margin-bottom-small">擁抱情緒，創造美好生活</h3>
                                <p>
                                一位心理學專家，擁有超過十五年的臨床經驗。在美國完成心理學碩士學位。多年的從業經驗讓她深刻理解情緒管理的重要性。決心創建這個網站，是希望提供一個平台，讓大家能夠分享自己的情緒，進而察覺和管理情緒。一直致力於推廣心理健康教育，並在多個國際會議上發表了相關論文。
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="story">
                            <figure className="story__shape">
                                <img src={nat9} alt="Person on a tour" className="story__img" />
                                <figcaption className="story__caption">Jack </figcaption>
                            </figure>
                            <div className="story__text">
                                <h3 className="heading-tertiary u-margin-bottom-small">用科技成就心靈的自由</h3>
                                <p>
                                擁有資深的技術背景，是一位富有創新精神的軟體工程師。專業涉及大數據分析和人工智慧，曾在國際頂尖科技公司工作數年。在認識到情緒管理和心理健康在現代生活中的重要性後，決定利用自己的技術專長，創建一個幫助大家管理和分享情緒的平台。相信科技不僅可以改變生活，還能改善人們的心理健康。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <div className="u-center-text u-margin-top-huge">
                        <a href="#" className="btn-text">Read all stories &rarr;</a>
                    </div> */}
                </section>

            </main>
        </>
    )
}