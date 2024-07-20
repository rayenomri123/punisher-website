import React, { useEffect, useState } from 'react';
import './Navbar.css'
import logo_nav from '../../assets/logo-nav.png'
import { Link } from 'react-scroll';
import menu_icon from '../../assets/menu-icon.png'

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  }

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <Link to='hero' smooth={true} offset={0} duration={500}><img src={logo_nav} alt="" className='logo'/></Link>
      <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
        <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
        <li><Link to='news' smooth={true} offset={-100} duration={500}>News</Link></li>
        <li><Link to='giveaway' smooth={true} offset={0} duration={500}>Giveaway</Link></li>
        <li><a href="https://www.youtube.com/@Punisher-pui" target="_blank" rel="noopener noreferrer">Channel</a></li>
        <li><Link to='contact' smooth={true} offset={0} duration={500} id='btn'>Contact</Link></li>
      </ul>
      <img src={menu_icon} alt="" className='menu-icon' onClick={toggleMenu}/>
    </nav>
  )
}

export default Navbar;
