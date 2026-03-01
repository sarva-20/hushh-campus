import client from './client';

export const fetchClubs = async () => {
    return await client.get('/clubs/');
};
