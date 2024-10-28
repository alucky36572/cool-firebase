import { Menu, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../utils/firebase";
import logo from "../img/logo-white.png";
import { useRef } from "react";

function Header({ user }) {
    const navToggleRef = useRef(null);

    const closeNav = () => {
        if(navToggleRef.current) {
            navToggleRef.current.checked = false;
        }
    }

    return (
        <>
            {user ? (
                <div className="navigation">
                    <input type="checkbox" className="navigation__checkbox" id="navi-toggle" ref={navToggleRef} />

                    <label htmlFor="navi-toggle" className="navigation__button">
                        <span className="navigation__icon">&nbsp;</span>
                    </label>

                    <div className="navigation__background">&nbsp;</div>

                    <nav className="navigation__nav">
                        <ul className="navigation__list">
                            <li className="navigation__item" ><Link to="/posts" className="navigation__link" onClick={closeNav}>情緒留言板</Link></li>
                            <li className="navigation__item" ><Link to="/new-post" className="navigation__link" onClick={closeNav}>發表情緒</Link></li>
                            <li className="navigation__item" ><Link to="/my/posts" className="navigation__link" onClick={closeNav}>會員專區</Link></li>
                            <li className="navigation__item" onClick={() => firebase.auth().signOut()}>
                                <Link to="/" className="navigation__link" onClick={closeNav}>登出</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            ) : (
                <div className="navigation">
                    <input type="checkbox" className="navigation__checkbox" id="navi-toggle" ref={navToggleRef} />

                    <label htmlFor="navi-toggle" className="navigation__button">
                        <span className="navigation__icon">&nbsp;</span>
                    </label>

                    <div className="navigation__background">&nbsp;</div>
                    <nav className="navigation__nav">
                        <ul className="navigation__list">
                            <li className="navigation__item" ><Link to="/posts" className="navigation__link" onClick={closeNav}>情緒留言板</Link></li>
                            <Menu.Item className="navigation__item" ><Link to="/signin" className="navigation__link" onClick={closeNav}>註冊/登入</Link></Menu.Item>
                        </ul>
                    </nav>
                </div>
            )}


            <header>
                <Menu.Item className="logo-box" as={Link} to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Menu.Item>
            </header>
        </>
    )
}

export default Header;