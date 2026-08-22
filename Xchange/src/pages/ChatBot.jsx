import '../App.css'
import axios from 'axios'
import { useState } from 'react';

function Chatbot(){
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();
        const trimmedPrompt = prompt.trim();
        if (!trimmedPrompt || isLoading) return;

        setMessages((current) => [...current, { role: 'user', text: trimmedPrompt }]);
        setPrompt('');
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/prompt', { prompt: trimmedPrompt });
            const answer = response.data.result || response.data.prompt || 'I received your message.';
            setMessages((current) => [...current, { role: 'assistant', text: answer }]);
        } catch (requestError) {
            setError('Unable to connect right now. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="chat-page">
            <section className="chat-shell" aria-label="Knowledge Xchange assistant">
                <header className="chat-header">
                    <div className="assistant-avatar" aria-hidden="true">K</div>
                    <div>
                        <p className="chat-kicker">Knowledge Xchange</p>
                        <h1>Study assistant</h1>
                        <p className="online-status"><span />Ready to help you explore</p>
                    </div>
                    <span className="header-mark" aria-hidden="true">✦</span>
                </header>

                <div className="chat-content">
                    {messages.length === 0 ? (
                        <div className="welcome-state">
                            <div className="welcome-icon" aria-hidden="true">✦</div>
                            <p className="chat-kicker">A fresh page of ideas</p>
                            <h2>What would you like to learn?</h2>
                            <p>Ask about a book, find a recommendation, or unpack a difficult concept.</p>
                            <div className="suggestion-row">
                                <button type="button" onClick={() => setPrompt('Recommend a book for me')}>Recommend a book</button>
                                <button type="button" onClick={() => setPrompt('Help me understand a concept')}>Explain a concept</button>
                            </div>
                        </div>
                    ) : (
                        <div className="message-list" aria-live="polite">
                            {messages.map((message, index) => (
                                <div className={`message-row ${message.role}`} key={`${message.role}-${index}`}>
                                    {message.role === 'assistant' && <div className="message-avatar">K</div>}
                                    <div className="message-bubble">{message.text}</div>
                                </div>
                            ))}
                            {isLoading && <div className="message-row assistant"><div className="message-avatar">K</div><div className="message-bubble typing"><i /><i /><i /></div></div>}
                        </div>
                    )}
                </div>

                <footer className="composer-area">
                    {error && <p className="chat-error" role="alert">{error}</p>}
                    <form className="chat-composer" onSubmit={submitHandler}>
                        <input type="text" name="prompt" value={prompt} placeholder="Ask anything about your next read..." onChange={(event) => setPrompt(event.target.value)} aria-label="Message the study assistant" />
                        <button type="submit" disabled={!prompt.trim() || isLoading} aria-label="Send message">{isLoading ? '...' : '↑'}</button>
                    </form>
                    <p className="composer-note">The assistant can make mistakes. Check important information.</p>
                </footer>
            </section>
        </main>
    )
}

export default Chatbot;
