import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Gift } from 'lucide-react';
import { fetchReferralData } from '../api/referral';
import referralDoodle from '../assets/referral_doodle.png'; // Will gracefully fail if missing initially

export const Referral = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('kai_user') || '{}');
                const refCode = user.referral_code || (user.name ? `KAI-${user.name.toUpperCase().replace(/\s+/g, '')}` : 'KAI-USER');
                const res = await fetchReferralData(refCode);
                setData(res.data);
            } catch (err) {
                console.error('Failed to load referral data', err);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleCopy = () => {
        if (data) {
            navigator.clipboard.writeText(`https://kaicampus.com/register?ref=${data.code}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (isLoading || !data) {
        return (
            <div className="layout-container text-center" style={{ padding: '6rem 1rem' }}>
                <div className="pulse-anim text-primary doodle-border" style={{ display: 'inline-block', padding: '2rem 4rem' }}>
                    Loading your rewards...
                </div>
            </div>
        );
    }

    const progressPercentage = (data.count / data.target) * 100;

    return (
        <div className="referral-page layout-container" style={{ padding: '3rem 1rem' }}>
            <div className="events-header text-center" style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem' }}>
                    Refer & Win <span className="wavy-underline text-primary">🎁</span>
                </h1>
                <p className="text-muted" style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
                    Bring your friends. Unlock exclusive campus perks.
                </p>
            </div>

            <div className="referral-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem', maxWidth: '800px', margin: '0 auto' }}>

                {/* Code Box */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="referral-code-box doodle-border text-center"
                    style={{ width: '100%', padding: '3rem 2rem', backgroundColor: 'var(--color-surface)' }}
                >
                    <p className="text-muted" style={{ marginBottom: '1rem', fontWeight: 600 }}>YOUR UNIQUE SHARE LINK</p>
                    <div
                        className="doodle-border-alt"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#fff',
                            padding: '1rem 2rem',
                            marginBottom: '2rem',
                            cursor: 'pointer'
                        }}
                        onClick={handleCopy}
                    >
                        <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '1px', wordBreak: 'break-all' }}>
                            kaicampus.com/register?ref=<span className="text-primary">{data.code}</span>
                        </span>
                        <button className="btn" style={{ padding: '0.5rem', minWidth: 'auto' }}>
                            {copied ? <Check className="text-primary" /> : <Copy className="text-muted" />}
                        </button>
                    </div>

                    <button className="btn btn-primary doodle-border w-100" style={{ fontSize: '1.25rem', padding: '1rem' }} onClick={handleCopy}>
                        Share with Friends 🚀
                    </button>
                </motion.div>

                {/* Progress Tracker */}
                <div className="progress-section w-100">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ margin: 0 }}>Your Progress</h3>
                        <span className="font-bold text-primary">{data.count} / {data.target} Friends</span>
                    </div>

                    <div className="doodle-progress-bg doodle-border" style={{ height: '30px', backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', padding: '4px' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="doodle-progress-fill doodle-border-alt"
                            style={{ height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '10px' }}
                        />
                    </div>
                </div>

                {/* Rewards */}
                <div className="rewards-section w-100">
                    <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Unlocks at {data.target} Referrals</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {data.rewards.map((reward, i) => (
                            <motion.div
                                key={reward.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`reward-card doodle-border ${reward.unlocked ? 'reward-unlocked text-primary' : 'reward-locked text-muted'}`}
                                style={{
                                    padding: '2rem 1rem',
                                    textAlign: 'center',
                                    backgroundColor: reward.unlocked ? '#FFF3ED' : 'var(--color-background)',
                                    opacity: reward.unlocked ? 1 : 0.6
                                }}
                            >
                                <Gift size={32} style={{ margin: '0 auto 1rem' }} />
                                <h4 style={{ margin: 0 }}>{reward.title}</h4>
                                {reward.unlocked && <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold' }}>UNLOCKED!</div>}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Celebration Illustration */}
                <div className="celebration-illustration" style={{ marginTop: '2rem' }}>
                    <img
                        src={referralDoodle}
                        alt="Student celebrating with trophy"
                        style={{ maxWidth: '300px', filter: progressPercentage === 100 ? 'none' : 'grayscale(1)', opacity: progressPercentage === 100 ? 1 : 0.3, transition: 'all 0.5s' }}
                        onError={(e) => e.target.style.display = 'none'} // Hide broken image if doodle generation is still pending
                    />
                </div>

            </div>
        </div>
    );
};
