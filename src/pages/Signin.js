import { useState } from "react";
import { Menu, Form, Container, Message } from "semantic-ui-react";
import firebase from "../utils/firebase";
import { useNavigate } from "react-router-dom";

function Signin() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState("register");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [resetMessageVisible, setResetMessageVisible] = useState(false);

    function onSubmit() {
        setIsLoading(true);
        if (activeItem === "register") {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    navigate("/my/settings");
                    alert("可以先修改會員名稱及照片哦!")
                    setIsLoading(false)
                })
                .catch((error) => {
                    switch (error.code) {
                        case "auth/email-already-in-use":
                            setErrorMessage("信箱已存在");
                            break;
                        case "auth/invalid-email":
                            setErrorMessage("信箱格式不正確");
                            break;
                        case "auth/weak-password":
                            setErrorMessage("密碼的最小長度為 6 個字符");
                            break;
                        default:
                    }
                    setIsLoading(false)
                });
        } else if (activeItem === "signin") {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    navigate("/posts");
                    setIsLoading(false)
                })
                .catch((error) => {
                    switch (error.code) {
                        case "auth/user-not-found":
                            setErrorMessage("信箱不存在");
                            break;
                        case "auth/invalid-email":
                            setErrorMessage("信箱格式不正確");
                            break;
                        case "auth/wrong-password":
                            setErrorMessage("密碼錯誤");
                            break;
                        default:
                    }
                    setIsLoading(false)
                });
        }
    }

    function handleResetPassword() {
        setIsLoading(true);
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(function () {
                setResetMessageVisible(true);
                setIsLoading(false);
                setTimeout(() => {
                    setResetMessageVisible(false);
                    setForgotPassword(false);
                    setActiveItem("signin")
                }, 5000);
            }).catch(function (error) {
                handleFirebaseErrors(error);
                setIsLoading(false);
            });
    }

    return (
        <Container>
            <Menu widths="2">
                <Menu.Item
                    active={activeItem === "register"}
                    onClick={() => {
                        setErrorMessage("");
                        setActiveItem("register");
                    }}
                >
                    註冊
                </Menu.Item>
                <Menu.Item
                    active={activeItem === "signin"}
                    onClick={() => {
                        setErrorMessage("");
                        setActiveItem("signin");
                    }}
                >
                    登入
                </Menu.Item>
            </Menu>
            {!forgotPassword ? (
                <Form onSubmit={onSubmit}>
                    <Form.Input label="信箱" value={email} placeholder="請輸入信箱" onChange={(e) => setEmail(e.target.value)} />
                    <Form.Input label="密碼" value={password} placeholder="請輸入密碼" onChange={(e) => setPassword(e.target.value)} type="password" />
                    {errorMessage && <Message negative>{errorMessage}</Message>}
                    {activeItem === "signin" && (
                        <Form.Button basic color='blue' size='mini' onClick={() => setForgotPassword(true)}>
                            忘記密碼
                        </Form.Button>)}
                    <Form.Button loading={isLoading}>
                        {activeItem === "register" && "註冊"}
                        {activeItem === "signin" && "登入"}
                    </Form.Button>
                </Form>
            ) : (
                <Form>
                    <span>我們將會寄一封修改密碼信件給您，屆時請至您的信箱內收取。</span>
                    <Form.Input label="請輸入您註冊的 Email" value={email} placeholder="請輸入信箱" onChange={(e) => setEmail(e.target.value)} />
                    {errorMessage && <Message negative>{errorMessage}</Message>}
                    <Form.Button onClick={handleResetPassword} loading={isLoading}>送出</Form.Button>


                    {resetMessageVisible && (
                        <Message positive>
                            信件已送出！請至您的信箱收取修改密碼信件，並完成修改密碼動作。
                        </Message>
                    )}
                </Form>
            )}
        </Container>
    )
}

export default Signin;