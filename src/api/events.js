import client from './client';

export const fetchEvents = async () => {
    return await client.get('/events/');
};

export const createEvent = async (eventData) => {
    // The token is automatically attached by the interceptor in client.js
    const payload = {
        title: eventData.title,
        description: eventData.description,
        venue: eventData.venue,
        event_time: eventData.date,
        join_link: eventData.join_link
    };
    return await client.post('/events/', payload);
};
