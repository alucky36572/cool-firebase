import Header from './components/Header';
import Footer from './components/Footer';
import Index from './pages/Index';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';

import Signin from './pages/Signin';
import Posts from './pages/Posts';
import NewPost from './pages/NewPost';
import Post from './pages/Post';
import MyPosts from './pages/MyPosts';
import MyCollections from './pages/MyCollections';
import MySettings from './pages/MySettings';

import Topics from './components/Topics';
import { useState, useEffect } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import firebase from './utils/firebase';
import MyMenu from './components/MyMenu';
import './sass/main.scss';

function App() {
    const [user, setUser] = useState();
    useEffect(() => {
        firebase.auth().onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
    }, []);

    return (
        <BrowserRouter>
            <Header user={user} />
            <Routes>
                <Route path="/" element={<Index user={user} />} />
                <Route path="/posts" element={
                    <Container>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Topics />
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Outlet />
                                </Grid.Column>
                                <Grid.Column width={3}></Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                }>
                    <Route index element={<Posts />} />
                    <Route path=":postId" element={user !== null ? <Post /> : <Navigate to="/signin" />} />
                </Route>

                <Route path="/my/*" element={user !== null ? (
                    <Container>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <MyMenu />
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Outlet />
                                </Grid.Column>
                                <Grid.Column width={3}></Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                ) : <Navigate to="/signin" />}>
                    <Route path="posts" element={<MyPosts />} />
                    <Route path="collections" element={<MyCollections />} />
                    <Route path="settings" element={<MySettings user={user} />} />
                </Route>

                <Route path="/signin" element={<Signin />} />
                {/* <Route path="/signin" element={user !== null ? <Navigate to="/posts" /> : <Signin />} /> */}
                <Route path="/new-post" element={user !== null ? <NewPost /> : <Navigate to="/signin" />} />
            </Routes>
            <Footer />
        </BrowserRouter>

    )
}

export default App;