import './TestComponent.scss';
import imgJoy from '../img/io_joy10.jpg';
import imgSad from '../img/io_sad11.jpg';
import imgAnger from '../img/io_anger10.jpg';
import imgDisgust from '../img/io_disgust9.jpg';
import imgFear from '../img/io_fear8.jpg';

export default function TestComponent() {

    return (
        <div className='container'>
            <div className='joy'>
                <img src={imgJoy} alt='joy'></img>
            </div>

            <div className='sad'>
                <img src={imgSad} alt='sad'></img>
            </div>

            <div className='anger'>
                <img src={imgAnger} alt='anger'></img>
            </div>

            <div className='disgust'>
                <img src={imgDisgust} alt='disgust'></img>
            </div>

            <div className='fear'>
                <img src={imgFear} alt='fear'></img>
            </div>
        </div>
    )
}