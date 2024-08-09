import React, { useState } from 'react';
import axios from 'axios';
/*


Create a full-stack application using Node.js with Express for the backend and React for the frontend. The application should:

Have an Express API with an endpoint that accepts a username or email.
Use this input to find the corresponding user from JSONPlaceholder API.
Calculate the average word count of the user's posts.
Return this information to the frontend.
Have a React frontend with an input field for username/email and a button to submit.
Display the result (average word count) on FE
Fetch the list of users from 'https://jsonplaceholder.typicode.com/users'
For each user, fetch their posts from 'https://jsonplaceholder.typicode.com/users/{userId}/posts'
*/
function App() {
    const [input, setInput] = useState('');
    const [averageWordCount, setAverageWordCount] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            setError('User not found or an error occurred');
            setAverageWordCount(null);
        }
    };

    return (
        <div className="App">
            <h1>Average Word Count of User's Posts</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter username or email"
                />
                <button type="submit">Submit</button>
            </form>
            {averageWordCount !== null && (
                <div>
                    <h2>Average Word Count: {averageWordCount}</h2>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default App;
