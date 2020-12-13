import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button'
import './Navbar.css';
import casa from '../Header/Home.png'


function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const [show, setShow] = useState(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        };
    };

    useEffect(() => {
        showButton()
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo'>
                        <img className='img' src={casa}></img>
                        <h1>PERFECT OCCUPANT</h1>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <div>
                        <button className='nav-button' onClick={() => setShow(!show)}>
                            {show ? 'Menu' : 'Menu'}
                        </button>
                        {show &&
                            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                                <li className='nav-item'>
                                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                        <h2>Home</h2>
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='/apartments' className='nav-links' onClick={closeMobileMenu}>
                                        <h2>Aparments</h2>
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='Comments' className='nav-links' onClick={closeMobileMenu}>
                                        <h2>Comments</h2>
                                    </Link>
                                </li>
                            </ul>
                        }
                    </div>
                    {button && <Button butonStyle='btn-sign-up'>Sign Up</Button>}
                    {button && <Button butonStyle='btn-login'>Login</Button>}
                </div>
            </nav>
        </>
    )
};

export default Navbar;
