import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Giveaway.css';

const Giveaway = () => {
    const [inGameName, setInGameName] = useState('');
    const [server, setServer] = useState('');
    const [platform, setPlatform] = useState('');
    const [message, setMessage] = useState('');
    const [formBlocked, setFormBlocked] = useState(false);

    useEffect(() => {
        const checkGiveawayStatus = async () => {
            try {
                const response = await axios.get('http://punisher-website.free.nf/news_backend/api1.php?action=get');
                const settings = response.data;
                const currentDate = new Date();
                const endDate = new Date(settings.end_date);
        
                if (currentDate > endDate || settings.current_participations >= settings.max_participations) {
                    setFormBlocked(true);
                    setMessage('Participation is over.');
                } else {
                    const timeRemainingMs = endDate - currentDate;
                    const timeRemainingHours = Math.ceil(timeRemainingMs / (1000 * 60 * 60)); // Convert milliseconds to hours
                    if (timeRemainingHours > 0) {
                        setTimeout(() => {
                            window.location.reload();
                        }, timeRemainingMs);
                    }
                }
            } catch (error) {
                console.error('Error checking giveaway status:', error);
            }
        };
        

        checkGiveawayStatus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://punisher-website.free.nf/news_backend/api1.php?action=addParticipant', {
                in_game_name: inGameName,
                server: server,
                platform: platform
            });

            if (response.data.success) {
                setMessage(response.data.message);
                setInGameName('');
                setServer('');
                setPlatform('');
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error adding participant:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'inGameName':
                setInGameName(value);
                break;
            case 'server':
                setServer(value);
                break;
            case 'platform':
                setPlatform(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="giveaway-container">
            <h2>Join Now</h2>
         
            <form onSubmit={handleSubmit}>
                <div id="form-group">
                    <label htmlFor="inGameName">In-game Name:</label>
                    <input type="text" id="inGameName" name="inGameName" value={inGameName} onChange={handleInputChange} required />
                </div>
                <div id="form-group">
                    <label htmlFor="server">Server:</label>
                    <input type="text" id="server" name="server" value={server} onChange={handleInputChange} required />
                </div>
                <div id="form-group">
                    <label htmlFor="platform">Platform:</label>
                    <select id="platform" name="platform" value={platform} onChange={handleInputChange} required>
                        <option value="" disabled hidden>Choose Platform</option>
                        <option value="Empire">Empire</option>
                        <option value="E4K">E4K</option>
                    </select>
                </div>
                <button id='submit' type="submit" disabled={formBlocked}>Join</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Giveaway;
