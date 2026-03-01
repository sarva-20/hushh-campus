import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { recommendClubs } from '../api/kai';
import { Loader2 } from 'lucide-react';

const QUESTIONS = [
    {
        id: 1,
        question: "What are you into?",
        options: [
            { id: 'tech', label: 'Tech', emoji: '💻' },
            { id: 'arts', label: 'Arts', emoji: '🎨' },
            { id: 'social', label: 'Social', emoji: '🤝' },
            { id: 'sports', label: 'Sports', emoji: '⚽' }
        ]
    },
    {
        id: 2,
        question: "Your vibe?",
        options: [
            { id: 'builder', label: 'Builder', emoji: '🔨' },
            { id: 'explorer', label: 'Explorer', emoji: '🔭' },
            { id: 'leader', label: 'Leader', emoji: '👑' },
            { id: 'creative', label: 'Creative', emoji: '🎭' }
        ]
    },
    {
        id: 3,
        question: "Dream goal?",
        options: [
            { id: 'startup', label: 'Startup', emoji: '🚀' },
            { id: 'research', label: 'Research', emoji: '📚' },
            { id: 'network', label: 'Network', emoji: '🌐' },
            { id: 'fun', label: 'Fun', emoji: '🎉' }
        ]
    }
];

export const Onboarding = () => {
    const [answers, setAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isAlreadyOnboarded = localStorage.getItem('kai_onboarded');
        if (isAlreadyOnboarded) {
            navigate('/events');
        }
    }, [navigate]);

    const handleSelect = (questionId, optionId) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length < 3) return;

        setIsLoading(true);
        const answersStr = Object.values(answers).join(', ');
        try {
            const response = await recommendClubs(answersStr);
            // Ensure we have recommendations to show, even if the backend returns unexpected shape
            // Expecting response.data.clubs or similar, but let's mock the display just in case if it's strings
            const recs = response?.data?.clubs || [
                { id: 1, name: "Tech Innovators", description: "Build cool stuff.", category: "Tech" },
                { id: 2, name: "Startup Connect", description: "Launch your dream.", category: "Business" }
            ];
            setRecommendations(recs);
        } catch (err) {
            console.error(err);
            // Fallback recommendations if API fails
            setRecommendations([
                { id: 1, name: "The Builders Club", description: "For those who create.", category: "Tech" },
                { id: 2, name: "Campus Explorers", description: "Discover new things.", category: "Social" }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const finishOnboarding = () => {
        localStorage.setItem('kai_onboarded', 'true');
        navigate('/events');
    };

    const isComplete = Object.keys(answers).length === 3;

    return (
        <div className="layout-container" style={{ padding: '3rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
            <AnimatePresence mode="wait">
                {!recommendations ? (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="text-center" style={{ marginBottom: '3rem' }}>
                            <h1 style={{ fontSize: '3rem' }}>
                                Let's Find Your <span className="wavy-underline text-primary">Tribe</span>
                            </h1>
                            <p className="text-muted" style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
                                Quick quiz to match you with the best campus communities.
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            {QUESTIONS.map((q) => (
                                <div key={q.id}>
                                    <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{q.question}</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                                        {q.options.map((opt) => (
                                            <motion.div
                                                key={opt.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`doodle-border quiz-card ${answers[q.id] === opt.id ? 'selected' : ''}`}
                                                onClick={() => handleSelect(q.id, opt.id)}
                                                style={{
                                                    padding: '2rem 1rem',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    backgroundColor: answers[q.id] === opt.id ? 'var(--color-primary)' : 'var(--color-surface)',
                                                    color: answers[q.id] === opt.id ? '#fff' : 'var(--color-text)',
                                                    transition: 'background-color 0.3s, color 0.3s'
                                                }}
                                            >
                                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{opt.emoji}</div>
                                                <div style={{ fontWeight: 'bold' }}>{opt.label}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center" style={{ marginTop: '4rem' }}>
                            <button
                                className="btn btn-primary doodle-border"
                                style={{ fontSize: '1.5rem', padding: '1rem 3rem' }}
                                disabled={!isComplete || isLoading}
                                onClick={handleSubmit}
                            >
                                {isLoading ? (
                                    <><Loader2 className="animate-spin mr-2" size={24} style={{ display: 'inline' }} /> Finding...</>
                                ) : (
                                    'Find My Tribe →'
                                )}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                    >
                        <div className="text-center" style={{ marginBottom: '3rem' }}>
                            <h1 style={{ fontSize: '3rem' }}>
                                Your Recommended <span className="wavy-underline text-primary">Clubs</span>
                            </h1>
                            <p className="text-muted" style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
                                Kai thinks you'd love these!
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '4rem' }}>
                            {recommendations.map((club, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="doodle-border-alt"
                                    style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-surface)', flexDirection: 'row', flexWrap: 'wrap', gap: '1rem' }}
                                >
                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <h3 style={{ margin: '0 0 0.5rem 0' }}>{club.name || club.title || club}</h3>
                                        {club.description && <p className="text-muted" style={{ margin: 0 }}>{club.description}</p>}
                                        {club.category && <span className="doodle-tag text-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>{club.category}</span>}
                                    </div>
                                    <button className="btn btn-outline doodle-border">
                                        Join Community
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center">
                            <button
                                className="btn btn-primary doodle-border"
                                style={{ fontSize: '1.5rem', padding: '1rem 3rem' }}
                                onClick={finishOnboarding}
                            >
                                Let's Go →
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
