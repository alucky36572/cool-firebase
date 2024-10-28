import { Item, Header, Button } from "semantic-ui-react";
import { Fragment, useEffect, useState } from "react";
import firebase from "../utils/firebase";
import Post from "../components/Post";

function MyPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = () => {
        firebase
        .firestore()
        .collection("posts")
        .where("author.uid", "==", firebase.auth().currentUser.uid)
        .get()
        .then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map(docSnapshot => {
                const id = docSnapshot.id;
                return { ...docSnapshot.data(), id };
            })
            setPosts(data);
        })
    }

    const deletePost = async (postId) => {
        try {
            const docRef = firebase.firestore().collection("posts").doc(postId);
            console.log('Document reference:', docRef);
            const confirmed = window.confirm("確定要刪除文章嗎?");
            if (!confirmed) {
                console.log("刪除已取消");
                return;
            }

            await docRef.delete();
            console.log('Post deleted successfully');
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error("刪除文章時發生錯誤:", error);
        }
    }

    return (
        <>
        <Header>我的文章</Header>
        <Item.Group>
            {posts.map(post => {
                return (
                    <Fragment key={post.id}>
                    <Post post={post} />
                    <Button negative onClick={() => deletePost(post.id)}>刪除文章</Button>
                    </Fragment>
                )
            })}
        </Item.Group>
        </>
    )
}

export default MyPosts;