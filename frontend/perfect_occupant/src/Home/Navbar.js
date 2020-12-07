import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button'
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

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
        <header>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo'>
                        <i class='fas Fchome' />
                        PERFECT OCCUPANT
                    </Link>
                    <div className='menu-icon' onClick={handleClick}> 
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/apartments' className='nav-links' onClick={closeMobileMenu}>
                                Aparments
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='Comments' className='nav-links' onClick={closeMobileMenu}>
                                Comments
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                    {button && <button butonStyle='btn-outline'>Sign Up</button>}
                </div>
            </nav>
        </header>
    )
};

export default Navbar;