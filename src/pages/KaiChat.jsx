import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { chatWithKai } from '../api/kai';

const SUGGESTIONS = [
    "What's happening this week?",
    "Which club should I join?",
    "How do I create an event?"
];

export const KaiChat = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Kai 🤖 your campus AI guide. How can I help you today?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), text, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const res = await chatWithKai(text);
            const botMsg = { id: Date.now() + 1, text: res.data.reply, isBot: true };
            setMessages(prev => [...prev, botMsg]);
        } catch (err) {
            const errorMsg = { id: Date.now() + 1, text: "Oops, my circuits got crossed. Please try again!", isBot: true };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="kai-chat-page layout-container" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)' }}>
            <div className="events-header text-center" style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>
                    Ask Kai <span className="wavy-underline text-primary">🤖</span>
                </h1>
            </div>

            <div className="chat-container doodle-border" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: 'var(--color-surface)', maxWidth: '800px', margin: '0 auto', width: '100%' }}>

                {/* Messages Window */}
                <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: msg.isBot ? 'row' : 'row-reverse',
                                    gap: '1rem',
                                    alignItems: 'flex-start'
                                }}
                            >
                                <div style={{ flexShrink: 0 }}>
                                    {msg.isBot ? (
                                        <div className="doodle-border text-primary" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '50%' }}>
                                            <Bot size={24} />
                                        </div>
                                    ) : (
                                        <div className="doodle-border" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-primary)', color: '#fff', borderRadius: '50%' }}>
                                            <User size={24} />
                                        </div>
                                    )}
                                </div>
                                <div
                                    className={msg.isBot ? "doodle-border-alt" : ""}
                                    style={{
                                        backgroundColor: msg.isBot ? '#fff' : 'var(--color-primary)',
                                        color: msg.isBot ? 'var(--color-text)' : '#fff',
                                        padding: '1rem 1.5rem',
                                        borderRadius: msg.isBot ? '15px 225px 15px 255px/255px 15px 225px 15px' : '20px 20px 0px 20px',
                                        maxWidth: '80%',
                                        position: 'relative'
                                    }}
                                >
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                            >
                                <div className="doodle-border text-primary" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '50%' }}>
                                    <Bot size={24} />
                                </div>
                                <div className="doodle-border-alt typing-indicator" style={{ backgroundColor: '#fff', padding: '1rem 1.5rem', display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                                    <span className="dot text-primary">●</span>
                                    <span className="dot text-primary">●</span>
                                    <span className="dot text-primary">●</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="chat-input-area" style={{ padding: '1.5rem', borderTop: '2px dashed var(--color-border)', backgroundColor: '#fff' }}>

                    {/* Suggestions */}
                    {messages.length === 1 && !isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="chat-suggestions"
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}
                        >
                            {SUGGESTIONS.map(s => (
                                <button
                                    key={s}
                                    className="doodle-tag text-primary"
                                    onClick={() => handleSend(s)}
                                    style={{ cursor: 'pointer', backgroundColor: 'var(--color-surface)', fontSize: '0.9rem' }}
                                >
                                    {s}
                                </button>
                            ))}
                        </motion.div>
                    )}

                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                        style={{ display: 'flex', gap: '1rem' }}
                    >
                        <input
                            type="text"
                            className="doodle-input"
                            placeholder="Ask Kai anything..."
                            style={{ flex: 1 }}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isTyping}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary doodle-border"
                            disabled={!input.trim() || isTyping}
                            style={{ padding: '0.75rem', borderRadius: '50%', width: '3rem', height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};
