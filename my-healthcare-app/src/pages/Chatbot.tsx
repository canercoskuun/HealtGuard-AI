import React, { useState } from 'react';

interface Message {
    text: string;
    isBot: boolean;
}

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            text: "Merhaba! Ben sizin sağlık asistanınızım. Size nasıl yardımcı olabilirim?",
            isBot: true
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;

        setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
        setInputMessage('');

        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: "Sağlığınızla ilgili endişelerinizi dinliyorum. Size en iyi şekilde yardımcı olmaya çalışacağım.",
                isBot: true
            }]);
        }, 500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-15" />

            <div className="relative z-10 h-screen flex flex-col">
                <div className="flex-1 flex flex-col">
                    <div className="bg-white/90 backdrop-blur-sm flex-1 flex flex-col">
                        <div className="flex items-center gap-4 p-6 border-b border-gray-100 bg-white/50">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
                                <i className="fas fa-heartbeat text-xl text-white"></i>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                                    AI Health Assistant
                                </h1>
                                <p className="text-gray-500 text-xs mt-1">Your personal healthcare companion</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-blue-50">
                            <div className="flex flex-col gap-4 max-w-5xl mx-auto">
                                {messages.map((message, index) => (
                                    <div key={index} className={`flex items-start gap-3 ${message.isBot ? '' : 'flex-row-reverse'}`}>
                                        {message.isBot ? (
                                            <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 p-2 shadow-md">
                                                <i className="fas fa-robot text-white text-base"></i>
                                            </div>
                                        ) : (
                                            <div className="rounded-full bg-gradient-to-r from-green-500 to-green-600 p-2 shadow-md">
                                                <i className="fas fa-user text-white text-base"></i>
                                            </div>
                                        )}
                                        <div
                                            className={`${message.isBot
                                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                                : 'bg-white'
                                                } rounded-lg p-3 shadow-md max-w-[80%] backdrop-blur-sm break-words`}
                                        >
                                            <p className="text-base leading-relaxed break-words">{message.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="max-w-5xl mx-auto flex gap-3">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Sağlığınızla ilgili sorularınızı yazabilirsiniz..."
                                    className="flex-1 rounded-lg border border-gray-200 p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg px-6 py-3 hover:opacity-90 transition-all flex items-center gap-2 text-base shadow-md hover:shadow-lg"
                                >
                                    <span>Gönder</span>
                                    <i className="fas fa-paper-plane text-base"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
