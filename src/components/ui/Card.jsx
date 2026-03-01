import React from 'react';

export const Card = ({ children, className = '', hoverEffect = true, ...props }) => {
    const baseStyle = {
        backgroundColor: 'var(--color-surface)',
        padding: '1.5rem',
        border: '2px solid var(--color-border)',
        borderRadius: 'var(--radius-doodle)',
        boxShadow: 'var(--shadow-doodle)',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden'
    };

    return (
        <div
            className={`doodle-card ${className}`}
            style={baseStyle}
            onMouseEnter={(e) => {
                if (hoverEffect) {
                    e.currentTarget.style.transform = 'translate(-2px, -2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-doodle-hover)';
                    e.currentTarget.style.borderRadius = 'var(--radius-doodle-alt)';
                }
            }}
            onMouseLeave={(e) => {
                if (hoverEffect) {
                    e.currentTarget.style.transform = 'translate(0px, 0px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-doodle)';
                    e.currentTarget.style.borderRadius = 'var(--radius-doodle)';
                }
            }}
            {...props}
        >
            {/* Subtle doodle decorative element inside card */}
            <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                opacity: 0.1,
                pointerEvents: 'none'
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 22h20L12 2z" />
                </svg>
            </div>
            {children}
        </div>
    );
};
