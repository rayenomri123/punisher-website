import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminGiveaway.css';

const AdminGiveaway = () => {
    const [maxParticipants, setMaxParticipants] = useState('');
    const [maxWinners, setMaxWinners] = useState('');
    const [endDate, setEndDate] = useState('');
    const [giveawaySettings, setGiveawaySettings] = useState({});
    const [winningNumberRange, setWinningNumberRange] = useState('');
    const [winningNumbers, setWinningNumbers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchGiveawaySettings();
        fetchWinningNumbers();
    }, []);

    const fetchGiveawaySettings = async () => {
        try {
            const response = await axios.get('http://punisher-website.free.nf/news_backend/api1.php?action=get');
            if (response.data.id) {
                setGiveawaySettings(response.data);
                setMaxParticipants(response.data.max_participations);
                setMaxWinners(response.data.max_winners);
                setEndDate(response.data.end_date);
            }
        } catch (error) {
            console.error('Error fetching giveaway settings:', error);
        }
    };

    const fetchWinningNumbers = async () => {
        try {
            const response = await axios.get('http://punisher-website.free.nf/news_backend/api1.php?action=getWinningNumbers');
            setWinningNumbers(response.data);
        } catch (error) {
            console.error('Error fetching winning numbers:', error);
        }
    };

    const handleAddOrUpdateSettings = async () => {
        try {
            if (giveawaySettings.id) {
                const response = await axios.post('http://punisher-website.free.nf/news_backend/api1.php?action=update', {
                    id: giveawaySettings.id,
                    max_participations: maxParticipants,
                    max_winners: maxWinners,
                    end_date: endDate
                });
                console.log(response.data.message);
            } else {
                const response = await axios.post('http://punisher-website.free.nf/news_backend/api1.php?action=add', {
                    max_participations: maxParticipants,
                    max_winners: maxWinners,
                    end_date: endDate
                });
                console.log(response.data.message);
            }
            fetchGiveawaySettings();
        } catch (error) {
            console.error('Error adding/updating settings:', error);
        }
    };

    const handleGenerateRandomNumber = async () => {
        try {
            const response = await axios.get('http://punisher-website.free.nf/news_backend/api1.php?action=generateRandomNumber&range=' + winningNumberRange);
            console.log(response.data.message);
            fetchWinningNumbers();
        } catch (error) {
            console.error('Error generating random number:', error);
        }
    };

    const handleDeleteWinningNumber = async (id) => {
        try {
            const response = await axios.post('http://punisher-website.free.nf/news_backend/api1.php?action=deleteWinningNumber', { id });
            console.log(response.data.message);
            fetchWinningNumbers();
        } catch (error) {
            console.error('Error deleting winning number:', error);
        }
    };

    const handleClearAllParticipants = async () => {
        try {
            const response = await axios.post('http://punisher-website.free.nf/news_backend/api1.php?action=clearAllParticipants');
            console.log(response.data.message);
        } catch (error) {
            console.error('Error clearing all participants:', error);
        }
    };

    return (
        <div id="giveaway-settings">
            <h2>Giveaway Settings</h2>
            <div>
                <label>Max Participants:</label>
                <input type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} />
            </div>
            <div>
                <label>Max Winners:</label>
                <input type="number" value={maxWinners} onChange={(e) => setMaxWinners(e.target.value)} />
            </div>
            <div>
                <label>End Date:</label>
                <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div>
                <button onClick={handleAddOrUpdateSettings}>Add/Update Settings</button>
            </div>
            {giveawaySettings.id && (
                <div id="existing-settings">
                    <h3>Existing Settings:</h3>
                    <p>
                        Max Participants: {giveawaySettings.max_participations}, Max Winners: {giveawaySettings.max_winners}, End Date: {giveawaySettings.end_date}
                    </p>
                </div>
            )}
            <div>
                <label>Winning Number Range:</label>
                <input type="number" value={winningNumberRange} onChange={(e) => setWinningNumberRange(e.target.value)} />
                <button onClick={handleGenerateRandomNumber}>Generate Random Number</button>
            </div>
            <div id="winning-numbers">
                <h3>Winning Numbers:</h3>
                <ul>
                    {winningNumbers.map((number) => (
                        <li key={number.id}>
                            Number: {number.winning_number}
                            
                            <button onClick={() => handleDeleteWinningNumber(number.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="clear-participants">
                <button onClick={handleClearAllParticipants}>Clear All Participants</button>
            </div>
        </div>
    );
};

export default AdminGiveaway;
