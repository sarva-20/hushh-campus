import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ExternalLink, Search, Sparkles } from 'lucide-react';
import { fetchEvents } from '../api/events';
import { Link } from 'react-router-dom';

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export const Events = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const res = await fetchEvents();
                setEvents(res.data);
            } catch (err) {
                console.error('Failed to load events:', err);
            } finally {
                setIsLoading(false);
            }
        };
        loadEvents();
    }, []);

    const filteredEvents = events.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="events-page layout-container" style={{ padding: '3rem 1rem' }}>
            <div className="events-header text-center" style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem' }}>
                    What's Happening <span className="wavy-underline text-primary">🎉</span>
                </h1>
                <p className="text-muted" style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
                    Discover the best events, workshops, and fests on campus.
                </p>
            </div>

            <div className="search-bar-container" style={{ maxWidth: '600px', margin: '0 auto 4rem', position: 'relative' }}>
                <Search className="search-icon text-muted" size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                    type="text"
                    placeholder="Search for hackathons, club meets, etc."
                    className="doodle-input w-100"
                    style={{ width: '100%', paddingLeft: '3rem', fontSize: '1.1rem' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="floating-doodle doodle-dot text-primary" style={{ top: '-10px', right: '-20px', fontSize: '2rem' }}>•</div>
            </div>

            {isLoading ? (
                <div className="events-grid skeleton-grid">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="event-card-skeleton doodle-border pulse-anim">
                            <div className="skeleton-line" style={{ width: '70%', height: '2rem', marginBottom: '1rem' }}></div>
                            <div className="skeleton-line" style={{ width: '50%', height: '1rem', marginBottom: '2rem' }}></div>
                            <div className="skeleton-line" style={{ width: '100%', height: '3rem' }}></div>
                        </div>
                    ))}
                </div>
            ) : filteredEvents.length > 0 ? (
                <motion.div
                    className="events-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {filteredEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03, zIndex: 10 }}
                            className={`event-card doodle-border ${index % 2 === 0 ? 'tilt-left' : 'tilt-right'}`}
                        >
                            <div className="event-card-accent"></div>
                            <Sparkles className="event-sparkle text-primary" size={20} />

                            <div className="event-tags">
                                {event.tags.map(tag => (
                                    <span key={tag} className="doodle-tag text-primary font-bold">#{tag}</span>
                                ))}
                            </div>

                            <h3 className="event-title">{event.title}</h3>

                            <div className="event-details text-muted">
                                <div className="event-detail-item">
                                    <MapPin size={16} />
                                    <span>{event.venue}</span>
                                </div>
                                <div className="event-detail-item">
                                    <Calendar size={16} />
                                    <span>{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>

                            <a
                                href={event.join_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline doodle-border w-100 event-join-btn"
                            >
                                Join Event <ExternalLink size={16} style={{ marginLeft: '0.5rem' }} />
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <div className="empty-state text-center doodle-border" style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto', backgroundColor: 'var(--color-surface)' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏕️</div>
                    <h3>No events found!</h3>
                    <p className="text-muted" style={{ marginBottom: '2rem' }}>Be the first to create one and gather the campus.</p>
                    <Link to="/events/create" className="btn btn-primary doodle-border">
                        Host an Event
                    </Link>
                </div>
            )}
        </div>
    );
};
