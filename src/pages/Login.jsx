import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Loader2 } from 'lucide-react';
import { loginUser } from '../api/auth';
import loginDoodle from '../assets/login_doodle.png';

export const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await loginUser(formData.email, formData.password);
            // Save to localStorage
            localStorage.setItem('kai_token', response.data.token);
            localStorage.setItem('kai_user', JSON.stringify(response.data.user));

            // Redirect
            const hasOnboarded = localStorage.getItem('kai_onboarded');
            if (hasOnboarded) {
                navigate('/events');
            } else {
                navigate('/onboarding');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page layout-container">
            {/* Subtly floating background doodles */}
            <div className="floating-doodle doodle-dot" style={{ top: '15%', right: '5%' }}>•</div>
            <div className="floating-doodle doodle-squiggle" style={{ bottom: '15%', left: '8%' }}>〰</div>
            <div className="floating-doodle doodle-star text-primary" style={{ top: '30%', left: '4%' }}>⋆</div>

            <div className="auth-card doodle-border">
                {/* Left Side: Doodle Illustration */}
                <div className="auth-illustration-side">
                    <img
                        src={loginDoodle}
                        alt="Student unlocking door"
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
                        <h3>Welcome Back!</h3>
                        <p>Unlock your campus experience.</p>
                    </div>

                    {error && <div className="auth-error doodle-border">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
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
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>New to Kai Campus? <Link to="/register" className="text-primary font-bold">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
