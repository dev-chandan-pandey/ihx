import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [averageWordCount, setAverageWordCount] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.trim()) {
            setError('Please enter a valid username or email.');
            return;
        }

        try {
            setError('');
            const response = await axios.get('http://localhost:5000/api/user-posts', {
                params: {
                    username: input,
                    email: input,
                },
            });
            setAverageWordCount(response.data.averageWordCount);
        } catch (err) {
            setError('User not found or an error occurred. Please try again.');
            setAverageWordCount(null);
        }
    };

    return (
        <div className="app-container">
            <h1>Average Word Count of User's Posts</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter username or email"
                    className="input-field"
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>
            {averageWordCount !== null && (
                <div className="result-container">
                    <h2>Average Word Count: {averageWordCount.toFixed(2)}</h2>
                </div>
            )}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default App;
