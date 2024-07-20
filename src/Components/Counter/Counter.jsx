import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Counter.css';
import Giveaway from '../Giveaway/Giveaway';

const Counter = () => {
    const [participations, setParticipations] = useState(0);
    const [maxParticipations, setMaxParticipations] = useState(0);
    const [endDate, setEndDate] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState('');
    const [loading, setLoading] = useState(true);
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        const fetchParticipationData = async () => {
            try {
                const response = await axios.get('http://punisher-website.free.nf/news_backend/api2.php?action=getParticipationCount');
                const data = response.data;
                setParticipations(data.current_participations);
                setMaxParticipations(data.max_participations);
                setEndDate(new Date(data.end_date)); // Ensure `end_date` is properly parsed into a Date object
                setLoading(false);
            } catch (error) {
                console.error('Error fetching participation data:', error);
                setLoading(false);
            }
        };

        fetchParticipationData();

        const intervalId = setInterval(fetchParticipationData, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, []);

    useEffect(() => {
        if (endDate) {
            const updateCountdown = () => {
                const now = new Date();
                const timeDifference = endDate.getTime() - now.getTime();

                if (timeDifference > 0) {
                    const hours = String(Math.floor(timeDifference / (1000 * 60 * 60))).padStart(2, '0');
                    const minutes = String(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                    const seconds = String(Math.floor((timeDifference % (1000 * 60)) / 1000)).padStart(2, '0');
                    setTimeRemaining(`${hours}:${minutes}:${seconds}`);
                } else {
                    setTimeRemaining('00:00:00');
                    fetchWinners();
                }
            };

            updateCountdown();
            const countdownInterval = setInterval(updateCountdown, 1000);

            return () => clearInterval(countdownInterval); // Clean up the interval on component unmount
        }
    }, [endDate]);

    const fetchWinners = async () => {
        try {
            const response = await axios.get('http://punisher-website.free.nf/news_backend/api2.php?action=getWinner');
            const data = response.data;
            setWinners(data);
        } catch (error) {
            console.error('Error fetching winners:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='counter' name='giveaway'>
            <h3 id='time'>{timeRemaining}</h3>
            {timeRemaining === '00:00:00' && winners.length > 0 && (
                <div>
                    <h3 id='w'>WINNERS</h3>
                    <br />
                    {winners.map((winner, index) => (
                        <div id="winners" key={index}>
                            <p>NAME: <span id='ingamename'>{winner.in_game_name}</span></p>
                            <p>SERVER: <span id='server'>{winner.server}</span></p>
                            <p>PLATFORM: <span id='platform'>{winner.platform}</span></p>
                            <br />
                        </div>
                    ))}
                </div>
            )}
            <p id="number">{participations} / {maxParticipations} <span id='part'>PARTICIPANT</span></p>
            <br />
            <Giveaway />
        </div>
    );
};

export default Counter;
