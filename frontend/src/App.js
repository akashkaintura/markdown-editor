import React, { useState } from 'react';
import './App.css';

function App() {
    const [markdown, setMarkdown] = useState('');
    const [html, setHtml] = useState('');

    const handleInputChange = async (e) => {
        const inputMarkdown = e.target.value;
        setMarkdown(inputMarkdown);

        // Use Fetch API to send Markdown to the backend
        try {
            const response = await fetch('http://localhost:4000/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ markdown: inputMarkdown }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setHtml(data.html);
        } catch (error) {
            console.error('Error converting Markdown:', error);
        }
    };

    return (
        <div className="app">
            <h1>Real-time Markdown Editor</h1>
            <div className="editor-container">
                <textarea
                    className="editor"
                    value={markdown}
                    onChange={handleInputChange}
                    placeholder="Write your Markdown here..."
                />
                <div
                    className="preview"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    );
}

export default App;