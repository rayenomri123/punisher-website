import React, { useState, useEffect } from 'react';
import './NewsSection.css'; // Import CSS for styling
import NewsCard from './NewsCard'; // Import NewsCard component
import back_icon from '../../assets/back-icon.png';
import next_icon from '../../assets/next-icon.png';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchNews(); // Fetch news on component mount
  }, []);

  const fetchNews = () => {
    // Fetch news data (adjust URL based on your setup)
    fetch('https://punisher-website.free.nf/news_backend/api.php')
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.error('Error fetching news:', error));
  };

  const nextSlide = () => {
    if (currentIndex < news.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="news-section" name='news'>
      <div className="news-slider">
        <div className="news-card-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {news.map((item, index) => (
            <div className="news-slide" key={item.id}>
              <NewsCard news={item} />
            </div>
          ))}
        </div>
        <button className="btn-prev" onClick={prevSlide} disabled={currentIndex === 0}>
          <img src={back_icon} alt="Previous" />
        </button>
        <button className="btn-next" onClick={nextSlide} disabled={currentIndex === news.length - 1}>
          <img src={next_icon} alt="Next" />
        </button>
      </div>
    </section>
  );
};

export default NewsSection;
