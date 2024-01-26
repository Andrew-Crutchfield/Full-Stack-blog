// Email.tsx
import React, { useState } from 'react';

const Email: React.FC = () => {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatusMessage('Sending email...');

        try {
            const response = await fetch('/contact-us', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipient, subject, message }),
            });

            const data = await response.json();
            if (data.success) {
                setStatusMessage('Email sent successfully!');
                setRecipient('');
                setSubject('');
                setMessage('');
            } else {
                setStatusMessage('Failed to send email: ' + data.message);
            }
        } catch (error) {
            setStatusMessage('An error occurred while sending the email.');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Send an Email</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Recipient:
                    <input type="email" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
                </label>
                <label>
                    Subject:
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </label>
                <label>
                    Message:
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                </label>
                <button type="submit">Send Email</button>
            </form>
            <p>{statusMessage}</p>
        </div>
    );
};

export default Email;