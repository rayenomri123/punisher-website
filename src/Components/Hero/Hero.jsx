import React from 'react';
import './Hero.css';
import design from '../../assets/design.png';
import darkArrow from '../../assets/dark-arrow.png'; // Correct import name
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <div className='hero container' name='hero'>
      <div className='hero-text'>
        <h1>Welcome</h1>
        <p>Here, you can participate in giveaways and check our latest news.</p>
        <p>Feel free to contact us for any inquiries.</p>
        <Link to='news' smooth={true} offset={-100} duration={500} id='btn1'>Explore more <img src={darkArrow} alt='Dark Arrow' /></Link><br/>
        <img src={design} alt='Design' id='design'/>
      </div>
    </div>
  );
}

export default Hero;
