import React, { useState, useEffect } from 'react';
import './Admin.css'
const Admin = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = () => {
    fetch('http://punisher-website.free.nf/news_backend/api.php')
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.error('Error fetching news:', error));
  };

  const handleAddNews = () => {
    const newNews = { title, image_url: imageUrl, content };
    fetch('http://punisher-website.free.nf/news_backend/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNews),
    })
      .then(response => response.json())
      .then(data => {
        console.log('News added:', data);
        fetchNews();
        setTitle('');
        setImageUrl('');
        setContent('');
      })
      .catch(error => console.error('Error adding news:', error));
  };

  const handleUpdateNews = () => {
    const updatedNews = { id: updateId, title, image_url: imageUrl, content };
    fetch('http://punisher-website.free.nf/news_backend/api.php', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(updatedNews),
    })
      .then(response => response.json())
      .then(data => {
        console.log('News updated:', data);
        fetchNews();
        setTitle('');
        setImageUrl('');
        setContent('');
        setUpdateId(null);
      })
      .catch(error => console.error('Error updating news:', error));
  };

  const handleDeleteNews = (id) => {
    fetch('http://punisher-website.free.nf/news_backend/api.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ id }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('News deleted:', data);
        fetchNews();
      })
      .catch(error => console.error('Error deleting news:', error));
  };

  const handleEditNews = (item) => {
    setTitle(item.title);
    setImageUrl(item.image_url);
    setContent(item.content);
    setUpdateId(item.id);
  };

  return (
    <div id="admin-page">
      <h1>Admin Page</h1>
      <div id="manage-news">
        <h2>Manage News</h2>
        <input
          type="text"
          id="news-title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          id="news-image-url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <textarea
          id="news-content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {updateId ? (
          <button id="update-news-button" onClick={handleUpdateNews}>Update News</button>
        ) : (
          <button id="add-news-button" onClick={handleAddNews}>Add News</button>
        )}
      </div>
      <div id="news-list">
        <h2>News List</h2>
        <ul id="news-items">
          {news.map(item => (
            <li key={item.id} id="news-item">
              <h3 id="news-item-title">{item.title}</h3>
              <img id="news-item-image" src={item.image_url} alt={item.title} width="100" />
              <p id="news-item-content">{item.content}</p>
              <button id="edit-news-button" onClick={() => handleEditNews(item)}>Edit</button>
              <button id="delete-news-button" className="delete" onClick={() => handleDeleteNews(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
