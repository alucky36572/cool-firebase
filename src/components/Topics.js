import { List } from "semantic-ui-react";
import firebase from "../utils/firebase";
import { useEffect, useState } from "react";
import 'firebase/firestore';
import { Link, useLocation } from "react-router-dom";
// import './Topics.scss';


function Topics() {
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search)
    const currentTopic = urlSearchParams.get("topic");
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        firebase
            .firestore()
            .collection("topics")
            .get()
            .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map((doc) => {
                    return doc.data();
                });
                setTopics([{ name: '全部' }, ...data]);
            });
    }, []);

    
    return (
        <List animated selection>
            {topics.map(topic => {
                return (
                    <List.Item
                        key={topic.name}
                        as={Link}
                        to={`/posts${topic.name === '全部' ? '#' : '?topic=' + topic.name}`}
                        active={currentTopic === topic.name || (currentTopic === null && topic.name === '全部')}
                        className="listItem"
                    >
                        {topic.name}
                    </List.Item>
                );
            })}
        </List>
    );
}

export default Topics;