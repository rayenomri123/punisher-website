import React from 'react';
import './NewsCard.css'; // Import CSS for styling
import SP from '../../assets/sp.png'
import SP1 from '../../assets/sp1.png'

const NewsCard = ({ news }) => {
  return (
    <div className='news-card'>
      <div className='news-image' style={{ backgroundImage: `url(${news.image_url})` }}>
        <div className='news-overlay'>
          <img id='sp' src={SP} alt="" />
          <div className='news-description'>
            <h3>{news.title}</h3>
            <h1>SUMMARY</h1>
            <p>{news.content}</p>
          </div>
          <img id="sp1" src={SP1} alt="" />
        </div>
      </div>
    </div>
  );z
};

export default NewsCard;
