import React from 'react';
import './Title.css';
import left from '../../assets/left.png'
import right from '../../assets/right.png'

const Title = ({subTitle, title}) => {
  return (
    <div id='titlesection'>
      <img id='left' src={left} alt="" />
      <div className='title'>
        
        <div>{subTitle}</div>
        <h2>{title}</h2>
        
      </div>
      <img id='right' src={right} alt="" />
    </div>
  );
}

export default Title;