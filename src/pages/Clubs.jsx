import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Users } from 'lucide-react';
import { fetchClubs } from '../api/clubs';
import clubsEmptyDoodle from '../assets/clubs_empty_doodle.png';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const CATEGORIES = ['All', 'Tech', 'Social', 'Arts'];

export const Clubs = () => {
    const [clubs, setClubs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        const loadClubs = async () => {
            try {
                const res = await fetchClubs();
                setClubs(res.data);
            } catch (err) {
                console.error('Failed to load clubs:', err);
            } finally {
                setIsLoading(false);
            }
        };
        loadClubs();
    }, []);

    const filteredClubs = activeTab === 'All'
        ? clubs
        : clubs.filter(c => c.category === activeTab);

    return (
        <div className="clubs-page layout-container" style={{ padding: '3rem 1rem' }}>
            <div className="events-header text-center" style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem' }}>
                    Find Your Tribe <span className="wavy-underline text-primary">🏆</span>
                </h1>
                <p className="text-muted" style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
                    Join communities, learn new skills, and make memories.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="category-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`btn doodle-border ${activeTab === cat ? 'btn-primary' : 'btn-outline'}`}
                        style={{ borderRadius: '50px', padding: '0.5rem 1.5rem', fontSize: '1rem' }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="events-grid skeleton-grid">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="event-card-skeleton doodle-border pulse-anim">
                            <div className="skeleton-line" style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '1.5rem' }}></div>
                            <div className="skeleton-line" style={{ width: '80%', height: '1.5rem', marginBottom: '1rem' }}></div>
                            <div className="skeleton-line" style={{ width: '100%', height: '4rem' }}></div>
                        </div>
                    ))}
                </div>
            ) : filteredClubs.length > 0 ? (
                <motion.div
                    className="events-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {filteredClubs.map((club, index) => (
                        <motion.div
                            key={club.id}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className={`event-card doodle-border-alt ${index % 2 === 0 ? 'tilt-right' : 'tilt-left'}`}
                            style={{ alignItems: 'flex-start', textAlign: 'left' }}
                        >
                            <div className="club-logo-placeholder doodle-border text-primary" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                                <Users size={28} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <h3 className="event-title" style={{ margin: 0 }}>{club.name}</h3>
                                <span className="doodle-tag text-primary font-bold">{club.category}</span>
                            </div>

                            <p className="text-muted" style={{ marginBottom: '2rem', flex: 1 }}>{club.description}</p>

                            <a
                                href={club.join_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary doodle-border w-100 event-join-btn"
                            >
                                Join Community <ExternalLink size={16} style={{ marginLeft: '0.5rem' }} />
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <div className="empty-state text-center" style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
                    <img
                        src={clubsEmptyDoodle}
                        alt="Student looking at empty box"
                        style={{ maxWidth: '300px', marginBottom: '2rem' }}
                    />
                    <h3>No clubs found for "{activeTab}"</h3>
                    <p className="text-muted" style={{ marginBottom: '2rem' }}>Looks like this category is pretty empty. Why not start a club?</p>
                    <button
                        className="btn btn-outline doodle-border"
                        onClick={() => setActiveTab('All')}
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
};
