import client from './client';

export const fetchReferralData = async (code) => {
    return await client.get(`/referral/${code}`);
};
