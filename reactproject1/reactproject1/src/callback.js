// getData.js

import axios from 'axios';

function getData(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const userUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
            const postsUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

            const userResponse = await axios.get(userUrl);
            const postsResponse = await axios.get(postsUrl);

            resolve({
                ...userResponse.data,
                posts: postsResponse.data
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            reject(error);
        }
    });
}

export default getData;
