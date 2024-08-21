import { useState, useEffect } from "react";
import { Container, Form, Header, Image, Button } from "semantic-ui-react";
import firebase from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

function NewPost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [topics, setTopics] = useState([]);
    const [topicName, setTopicName] = useState("");
    const [level, setLevel] = useState([]);
    const [levelName, setLevelName] = useState("");
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        firebase
            .firestore()
            .collection("topics")
            .get()
            .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map((doc) => {
                    return doc.data();
                });
                setTopics(data);
            });

            firebase
            .firestore()
            .collection("level")
            .get()
            .then((collectionSnapshot) => {
                const levelData = collectionSnapshot.docs.map((doc) => {
                    return doc.data();
                });
                setLevel(levelData);
            });
    }, []);

    const options = topics.map((topic) => {
        return {
            text: topic.name,
            value: topic.name
        };
    });
    const levelOptions = level.map((levelItem) => {
        return {
            text: levelItem.name,
            value: levelItem.name
        };
    });

    const previewUrl = file
        ? URL.createObjectURL(file)
        : "https://react.semantic-ui.com/images/wireframe/image.png";

        function onSubmit() {
            setIsLoading(true);
            const documentRef = firebase.firestore().collection("posts").doc();
            
            if (!file) {
                // 如果沒有選擇文件，直接保存其他資料
                savePost(documentRef, null);
                return;
            }
        
            const fileRef = firebase.storage().ref('post-images/' + documentRef.id);
            const metadata = {
                contentType: file.type
            };
            
            fileRef.put(file, metadata)
                .then(() => {
                    return fileRef.getDownloadURL();  // 修正這裡：getDownloadURL 而不是 getDownloadUrl
                })
                .then((imageUrl) => {
                    savePost(documentRef, imageUrl);
                })
                .catch((error) => {
                    console.error("Error uploading image: ", error);
                    setIsLoading(false);
                    // 這裡可以添加一些用戶提示
                });
        }
        
        function savePost(documentRef, imageUrl) {
            documentRef.set({
                title,
                content,
                topic: topicName,
                level: levelName,
                createdAt: firebase.firestore.Timestamp.now(),
                author: {
                    displayName: firebase.auth().currentUser.displayName || '',
                    photoURL: firebase.auth().currentUser.photoURL || '',
                    uid: firebase.auth().currentUser.uid,
                    email: firebase.auth().currentUser.email,
                },
                imageUrl: imageUrl || ''
            })
            .then(() => {
                setIsLoading(false);
                navigate("/posts");
            })
            .catch((error) => {
                console.error("Error saving post: ", error);
                setIsLoading(false);
                // 這裡可以添加一些用戶提示
            });
        }

    return (
        <Container>
            <Header>分享情緒</Header>
            <Form onSubmit={onSubmit}>
                <Image
                    src={previewUrl}
                    size="small"
                    floated="left"
                ></Image>
                <Button basic as="label" htmlFor="post-image">上傳圖片</Button>
                <Form.Input
                    type="file"
                    id="post-image"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}

                />
                <Form.Input
                    placeholder="輸入標題"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></Form.Input>
                <Form.TextArea
                    placeholder="輸入事件內容"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></Form.TextArea>
                <Form.Dropdown
                    placeholder="選擇情緒分級"
                    options={levelOptions}
                    selection
                    value={levelName}
                    onChange={(e, { value }) => setLevelName(value)}
                >
                </Form.Dropdown>
                <Form.Dropdown
                    placeholder="選擇情緒主題"
                    options={options}
                    selection
                    value={topicName}
                    onChange={(e, { value }) => setTopicName(value)}
                >
                </Form.Dropdown>
                <Form.Button loading={isLoading}>送出</Form.Button>
            </Form>
        </Container>
    )
}

export default NewPost;