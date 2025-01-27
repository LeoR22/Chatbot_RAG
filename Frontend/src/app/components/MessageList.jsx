const MessageList = ({ messages, loading }) => (
    <div className="messages flex-grow p-4 space-y-4 bg-gray-50 rounded-lg">
        {messages.map((msg, index) => (
            <div
                key={index}
                className={`message ${msg.sender === "user" ? "text-right" : "text-left"}`}
            >
                <div className="flex items-center space-x-2">
                    {msg.sender === "user" ? (
                        <img src="/user-icon.png" alt="User" className="w-6 h-6" />
                    ) : (
                        <img src="/chatbot-icon.png" alt="Chatbot" className="w-6 h-6" />
                    )}
                    <div
                        className={`message-text p-3 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        {msg.text}
                    </div>
                </div>
            </div>
        ))}
        {loading && (
            <div className="message text-left mb-4">
                <div className="message-text p-3 rounded-lg bg-gray-200">Cargando...</div>
            </div>
        )}
    </div>
);

export default MessageList;
