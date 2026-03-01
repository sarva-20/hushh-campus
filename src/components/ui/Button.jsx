import React from 'react';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        transition: 'all 0.2s ease',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: '2px solid var(--color-border)',
            boxShadow: 'var(--shadow-doodle)',
            borderRadius: 'var(--radius-doodle)',
        },
        secondary: {
            backgroundColor: 'white',
            color: 'var(--color-text)',
            border: '2px dashed var(--color-border)',
            boxShadow: 'var(--shadow-doodle)',
            borderRadius: 'var(--radius-doodle-alt)',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--color-text)',
            border: '2px solid transparent',
            borderRadius: 'var(--radius-doodle)',
        }
    };

    const sizes = {
        sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
        md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
        lg: { padding: '1rem 2rem', fontSize: '1.125rem' }
    };

    const getHoverStyles = (currentVariant) => {
        if (currentVariant === 'primary') return { transform: 'translate(-2px, -2px)', boxShadow: 'var(--shadow-doodle-hover)' };
        if (currentVariant === 'secondary') return { transform: 'translate(-2px, -2px)', boxShadow: 'var(--shadow-doodle-hover)' };
        return { backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-border)' };
    };

    // We handle hover via CSS in standard setups, but here we can add a generic class
    // Let's use inline mixed with standard classes from index.css for ease without tailwind
    return (
        <button
            className={`btn-${variant} ${className}`}
            style={{ ...baseStyles, ...variants[variant], ...sizes[size] }}
            onMouseEnter={(e) => {
                if (variant !== 'ghost') {
                    e.currentTarget.style.transform = 'translate(-2px, -2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-doodle-hover)';
                } else {
                    e.currentTarget.style.border = '2px solid var(--color-border)';
                    e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                }
            }}
            onMouseLeave={(e) => {
                if (variant !== 'ghost') {
                    e.currentTarget.style.transform = 'translate(0px, 0px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-doodle)';
                } else {
                    e.currentTarget.style.border = '2px solid transparent';
                    e.currentTarget.style.backgroundColor = 'transparent';
                }
            }}
            {...props}
        >
            {children}
        </button>
    );
};
