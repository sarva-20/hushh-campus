import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Loader2 } from 'lucide-react';
import { registerUser } from '../api/auth';
import registerDoodle from '../assets/register_doodle.png';

export const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Frontend validation
        if (!formData.email.endsWith('@kpriet.ac.in')) {
            setError('Please use a valid @kpriet.ac.in email address.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await registerUser(formData.name, formData.email, formData.password);
            // Save to localStorage
            localStorage.setItem('kai_token', response.data.access_token);
            localStorage.setItem('kai_user', JSON.stringify({ name: response.data.name }));

            // Redirect
            const hasOnboarded = localStorage.getItem('kai_onboarded');
            if (hasOnboarded) {
                navigate('/events');
            } else {
                navigate('/onboarding');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page layout-container">
            {/* Subtly floating background doodles */}
            <div className="floating-doodle doodle-star" style={{ top: '10%', left: '5%' }}>✧</div>
            <div className="floating-doodle doodle-squiggle" style={{ bottom: '20%', right: '10%' }}>〰</div>
            <div className="floating-doodle doodle-star text-primary" style={{ bottom: '10%', left: '15%' }}>⋆</div>

            <div className="auth-card doodle-border">
                {/* Left Side: Doodle Illustration */}
                <div className="auth-illustration-side">
                    <img
                        src={registerDoodle}
                        alt="Student holding welcome sign"
                        className="auth-image"
                    />
                </div>

                {/* Right Side: Form */}
                <div className="auth-form-side">
                    <div className="auth-logo">
                        <Sparkles className="text-primary" size={24} />
                        <h2>Kai Campus</h2>
                    </div>

                    <div className="auth-header">
                        <h3>Join the Community</h3>
                        <p>Your campus life, all in one place.</p>
                    </div>

                    {error && <div className="auth-error doodle-border">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="doodle-input"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">College Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="doodle-input"
                                placeholder="yourname@kpriet.ac.in"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="doodle-input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary doodle-border auth-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login" className="text-primary font-bold">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
