import client from './client';

export const fetchEvents = async () => {
    return await client.get('/events/');
};

export const createEvent = async (eventData) => {
    // The token is automatically attached by the interceptor in client.js
    return await client.post('/events/', eventData);
};
