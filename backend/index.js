const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/user-posts', async (req, res) => {
    const { username, email } = req.query;

    try {
        // Fetch users
        const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = usersResponse.data;

        // Find the user by username or email
        const user = users.find(u => u.username === username || u.email === email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch posts for the user
        const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
        const posts = postsResponse.data;

        // Calculate average word count
        const totalWords = posts.reduce((sum, post) => sum + post.body.split(' ').length, 0);
        const averageWordCount = totalWords / posts.length;

        res.json({ averageWordCount });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
