import client from './client';

export const loginUser = async (email, password) => {
    return await client.post('/auth/login', { email, password });
};

export const registerUser = async (name, email, password) => {
    return await client.post('/auth/register', { name, email, password });
};
