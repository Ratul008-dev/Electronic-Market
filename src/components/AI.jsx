import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './AI.css'


const AI = () => {
    const [prompt, setPrompt] = useState("")
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const askAI = async () => {
        if (!prompt.trim() || loading) return;
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const result = await response.json();

            setMessages(prev => [
                ...prev,
                {
                    sender: "user",
                    text: prompt,
                },
                {
                    sender: "ai",
                    text: result.reply,
                    products: result.products || []
                }
            ]);

            setPrompt("");

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {/* Floating Button */}
            {!open && (
                <button
                    className="floating-ai-btn"
                    onClick={() => setOpen(true)}
                >
                    🤖
                </button>
            )}

            {/* Chat Window */}
            {open && (
                <div className="ai-container">

                    <div className="ai-header">

                        <div className="ai-avatar">🤖</div>

                        <div>
                            <h3>Electronic Market AI</h3>
                            <p>Ask anything about our products</p>
                        </div>

                        <button
                            className="close-btn"
                            onClick={() => setOpen(false)}
                        >
                            ✕
                        </button>

                    </div>

                    <div className="chat-window">

                        {messages.length === 0 && (
                            <div className="welcome-message">

                                <h4>Hello 👋</h4>

                                <p>
                                    I'm Electronic Market AI.
                                    <br />
                                    How can I help you today?
                                </p>

                            </div>
                        )}

                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={
                                    msg.sender === "user"
                                        ? "user-message"
                                        : "ai-message"
                                }
                            >


                                <div className="ai-text">
                                    {msg.sender === "ai"
                                        ? (msg.text || "").split("\n").map((line, i) => {
                                            if (!line.trim()) return null;

                                            return (
                                                <div key={i} className="ai-line">
                                                    {line}
                                                </div>
                                            );
                                        })
                                        : msg.text
                                    }
                                </div>
                                {msg.sender === "ai" && msg.products?.length > 0 && (

                                    <div className="ai-products">

                                        {msg.products.map(product => (


                                            // <Link 
                                            // key={product.id}
                                            // to={`/Products/${product.id}`}> 

                                            // </Link>
                                            <div
                                                key={product.id}
                                                className="ai-product-card"
                                            >
                                                <h5>{product.name}</h5>
                                                <p>₹{product.price.toLocaleString('en-IN')}</p>


                                            </div>
                                        ))}

                                    </div>

                                )}


                            </div>

                        ))}
                        {loading &&(
                            <div className='thinking'>
                                🤖 EM Assistant is thinking
                            </div>
                        )}

                    </div>

                    <div className="input-area">

                        <input
                            type="text"
                            placeholder="Ask about products..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />

                        <button onClick={askAI}>
                            Send
                        </button>

                    </div>


                </div>
            )}
        </>
    );
}

export default AI