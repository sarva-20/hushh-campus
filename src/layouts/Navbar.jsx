import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Navbar = () => {
    const navItems = [
        { name: 'Events', path: '/events' },
        { name: 'Clubs', path: '/clubs' },
        { name: 'Ask Kai ✨', path: '/kai' },
    ];

    return (
        <nav style={{
            borderBottom: '2px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            boxShadow: '0 4px 0 0 rgba(0,0,0,0.05)'
        }}>
            <div className="layout-container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem'
            }}>
                {/* Logo */}
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="doodle-border" style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        transform: 'rotate(-5deg)'
                    }}>K</div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
                        Kai <span style={{ color: 'var(--color-primary)' }}>Campus</span>
                    </span>
                </Link>

                {/* Links (Desktop) */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            style={({ isActive }) => ({
                                color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                                fontWeight: isActive ? 800 : 600,
                                textDecoration: isActive ? 'underline wavy var(--color-primary)' : 'none',
                                textUnderlineOffset: '4px'
                            })}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                {/* Auth Actions */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/login">
                        <Button variant="ghost" size="sm">Log in</Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="primary" size="sm">Join Now</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
