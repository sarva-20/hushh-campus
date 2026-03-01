import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { Loader2 } from 'lucide-react';
import { createEvent } from '../api/events';
import rocketDoodle from '../assets/rocket_doodle.png';

export const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        venue: '',
        date: '',
        join_link: ''
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const navigate = useNavigate();

    // Protected Route Check
    const token = localStorage.getItem('kai_token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await createEvent(formData);
            setShowConfetti(true);
            setTimeout(() => {
                navigate('/events');
            }, 2500); // Wait for confetti
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to create event.');
            setIsLoading(false);
        }
    };

    if (!token) return null; // Prevent flash before redirect

    return (
        <div className="create-event-page layout-container" style={{ padding: '3rem 1rem' }}>
            {showConfetti && <Confetti colors={['#FF6B2C', '#1A1A1A', '#FFFFFF']} />}

            <div className="events-header text-center" style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem' }}>
                    Create an Event <span className="wavy-underline text-primary">✏️</span>
                </h1>
                <p className="text-muted" style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
                    Host a workshop, meet, or fest. Gather your tribe.
                </p>
            </div>

            <div className="create-event-content">
                {/* Left Side: Doodle Illustration */}
                <div className="create-illustration-side">
                    <img
                        src={rocketDoodle}
                        alt="Rocket taking off"
                        className="auth-image floating-doodle"
                        style={{ animation: 'float 6s infinite ease-in-out' }}
                    />
                </div>

                {/* Right Side: Form */}
                <div className="create-form-side">
                    <div className="auth-card doodle-border" style={{ padding: '3rem', width: '100%' }}>
                        {error && <div className="auth-error doodle-border">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="title">Event Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="doodle-input"
                                    placeholder="e.g. Intro to UI/UX"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description (Optional)</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="doodle-input"
                                    placeholder="What's this event about?"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                    style={{ resize: 'vertical' }}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="venue">Venue</label>
                                <input
                                    type="text"
                                    id="venue"
                                    name="venue"
                                    className="doodle-input"
                                    placeholder="e.g. Lab Block B"
                                    value={formData.venue}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="date">Date & Time</label>
                                <input
                                    type="datetime-local"
                                    id="date"
                                    name="date"
                                    className="doodle-input"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="join_link">Join Link (WhatsApp/Discord/GForm)</label>
                                <input
                                    type="url"
                                    id="join_link"
                                    name="join_link"
                                    className="doodle-input"
                                    placeholder="https://..."
                                    value={formData.join_link}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary doodle-border auth-submit-btn"
                                disabled={isLoading || showConfetti}
                                style={{ fontSize: '1.2rem', marginTop: '2rem' }}
                            >
                                {isLoading ? (
                                    <><Loader2 className="animate-spin mr-2" size={20} /> Publishing...</>
                                ) : showConfetti ? (
                                    'Published! 🚀'
                                ) : (
                                    'Publish Event 🚀'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
