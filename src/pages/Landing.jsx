import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, Gift, ArrowRight } from 'lucide-react';
import heroDoodle from '../assets/hero_doodle.png';

export const Landing = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section layout-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Campus. <br />
            <span className="wavy-underline text-primary">All in One Place.</span>
          </h1>
          <p className="hero-subtitle">
            Discover events, join clubs, chat with <span className="highlight-kai text-primary font-bold">Kai</span> — your AI campus guide. Only for KPRIET students.
          </p>
          <div className="hero-cta">
            <Link to="/events" className="btn btn-primary doodle-border">
              Explore Events
            </Link>
            <Link to="/register" className="btn btn-outline doodle-border">
              Join Now
            </Link>
            <div className="doodle-arrow-container">
              {/* Simple SVG hand-drawn arrow */}
              <svg className="doodle-arrow text-primary" width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 80 Q 50 10, 80 40 M 80 40 L 60 30 M 80 40 L 70 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="hero-illustration">
          <img src={heroDoodle} alt="Student checking laptop with doodle floating elements" className="hero-image doodle-border-alt" />
          <div className="floating-doodle doodle-star">✧</div>
          <div className="floating-doodle doodle-squiggle">〰</div>
          <div className="floating-doodle doodle-dot">•</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section layout-container">
        <h2 className="section-title text-center">Why join <span className="text-primary">Kai Campus</span>?</h2>
        <div className="features-grid">
          <div className="feature-card doodle-border">
            <div className="feature-icon doodle-border-alt text-primary">🎉</div>
            <h3 className="feature-title">Discover Events</h3>
            <p className="feature-desc">Find everything happening on campus in one feed. Never miss out on a hackathon or cultural fest.</p>
          </div>
          <div className="feature-card doodle-border">
            <div className="feature-icon doodle-border-alt text-primary">🤖</div>
            <h3 className="feature-title">Ask Kai</h3>
            <p className="feature-desc">Get instant answers about clubs, events, and campus life. Our AI knows KPRIET inside and out.</p>
          </div>
          <div className="feature-card doodle-border">
            <div className="feature-icon doodle-border-alt text-primary">🏆</div>
            <h3 className="feature-title">Refer & Win</h3>
            <p className="feature-desc">Bring 3 friends, unlock VIP notes and exclusive passes. Sharing is rewarding!</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section layout-container">
        <h2 className="section-title text-center">How It Works</h2>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number doodle-border text-primary">1</div>
            <h4 className="step-title">Register</h4>
            <p>Sign up with your college email.</p>
          </div>
          <div className="step-connector dashed-line"></div>
          <div className="step-item">
            <div className="step-number doodle-border text-primary">2</div>
            <h4 className="step-title">Explore</h4>
            <p>Find events & join clubs.</p>
          </div>
          <div className="step-connector dashed-line"></div>
          <div className="step-item">
            <div className="step-number doodle-border text-primary">3</div>
            <h4 className="step-title">Connect</h4>
            <p>Chat with Kai & peers.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
