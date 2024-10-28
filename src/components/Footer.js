import logo2 from '../img/logo-white.png';

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer__logo-box">
                    <img src={logo2} alt="full logo" className='footer__logo' />
                </div>
                <div className="row">
                    <div className="col-1-of-1">
                        <div className="footer__navigation">
                            <ul className="footer__list">
                                <li className="footer__item"><a href="#" className='footer__link'>公司</a></li>
                                <li className="footer__item"><a href="#" className='footer__link'>聯絡我們</a></li>
                                <li className="footer__item"><a href="#" className='footer__link'>職缺</a></li>
                                <li className="footer__item"><a href="#" className='footer__link'>隱私權政策</a></li>
                                <li className="footer__item"><a href="#" className='footer__link'>條款</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}