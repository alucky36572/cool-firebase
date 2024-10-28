import { Item, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Post.scss";

export default function Post ({post}) {
    const getClassNameByTopic = (topic) => {
        switch (topic) {
            case '樂樂':
                return 'joyful';
            case '憂憂':
                return 'sadness';
            case '怒怒':
                return 'angry';
            case '厭厭':
                return 'disgusting';
            case '驚驚':
                return 'afraid';
            default:
                return '';
        }
    }
    return(
        <Item as={Link} to={`/posts/${post.id}`}>
                        <Item.Image src={
                            post.imageUrl ||
                            "https://react.semantic-ui.com/images/wireframe/image.png"
                        }></Item.Image>
                        <Item.Content>
                            <Item.Meta className={getClassNameByTopic(post.topic)}>
                            <div className="userInfo">
                                {post.author.photoURL ? (
                                    <Image src={post.author.photoURL} avatar />
                                ) : (
                                    <Icon name="user circle"></Icon>
                                )}{' '}
                                {post.author.displayName || '使用者'}
                            </div>
                                
                                <div className="emo">
                                    {post.topic} 程度{post.level}
                                </div>
                                
                            </Item.Meta>
                            
                            <Item.Header>{post.title}</Item.Header>
                            <Item.Description>{post.content}</Item.Description>
                            <Item.Extra>留言 {post.commentsCount || 0} 讚 {post.likedBy?.length || 0}</Item.Extra>
                        </Item.Content>
                    </Item>
    )
}