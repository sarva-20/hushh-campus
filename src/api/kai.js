import client from './client';

export const chatWithKai = async (message) => {
    return await client.post('/kai/chat', { message });
};

export const recommendClubs = async (answers) => {
    return await client.post('/kai/recommend', { message: answers });
};
