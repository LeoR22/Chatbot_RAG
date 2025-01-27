"use client";
import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            text: "¡Hola! ¿En qué puedo ayudarte hoy? Escribe una pregunta sobre nuestras bases de datos.",
            sender: "bot",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [sqlQuery, setSqlQuery] = useState("");

    const sendMessage = async (message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, sender: "user" },
        ]);
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/query`,
                {
                    question: message,
                }
            );

            const { sql_query, results } = response.data;

            setSqlQuery(sql_query);
            setResults(results);

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: `¡Excelente pregunta! Basándonos en el esquema de la base de datos, he generado una consulta SQL para responder tu pregunta:`,
                    sender: "bot",
                },
                { text: `${sql_query}`, sender: "bot" },
                { text: `Resultados de la consulta:`, sender: "bot" },
            ]);
        } catch (error) {
            console.error("Error al obtener respuesta del servidor:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: "Lo siento, ocurrió un error al procesar tu solicitud.",
                    sender: "bot",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(results);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Resultados");
        XLSX.writeFile(wb, "resultados.xlsx");
    };

    const renderTable = () => {
        if (!results || results.length === 0) {
            return <p>No hay resultados disponibles.</p>;
        }

        const headers = Object.keys(results[0]);

        return (
            <div className="overflow-x-auto mt-4 border rounded-lg p-4">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            {headers.map((key) => (
                                <th
                                    key={key}
                                    className="border px-4 py-2 text-left font-medium"
                                >
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {headers.map((key) => (
                                    <td key={key} className="border px-4 py-2">
                                        {row[key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        //<div className="chatbot-container flex flex-col w-full bg-white rounded-lg shadow-lg">
        <div className="chatbot-container flex flex-col w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
                <img src="/chatbot-icon.png" alt="Logo" className="w-16 h-16 mr-4" />
                <h1 className="text-xl font-semibold text-gray-800">
                    Asistente de Base de Datos
                </h1>
            </div>

            <div className="messages flex-grow p-4 space-y-4 bg-gray-50 rounded-lg">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === "user" ? "text-right" : "text-left"
                            }`}
                    >
                        <div className="flex items-center space-x-2">
                            {msg.sender === "user" ? (
                                <img
                                    src="/user-icon.png"
                                    alt="User"
                                    className="w-6 h-6"
                                />
                            ) : (
                                <img
                                    src="/chatbot-icon.png"
                                    alt="Chatbot"
                                    className="w-6 h-6"
                                />
                            )}
                            <div
                                className={`message-text p-3 rounded-lg ${msg.sender === "user"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="message text-left mb-4">
                        <div className="message-text p-3 rounded-lg bg-gray-200">
                            Cargando...
                        </div>
                    </div>
                )}
            </div>

            {renderTable()}

            {results && results.length > 0 && (
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={downloadExcel}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Descargar Excel
                    </button>
                </div>
            )}

            <div className="input-container flex items-center mt-4 bg-gray-100 p-4 rounded-lg shadow-inner">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-3 rounded-l-lg border border-gray-300"
                    placeholder="Escribe tu pregunta..."
                />
                <button
                    onClick={() => sendMessage(input)}
                    className="px-4 py-3 bg-blue-500 text-white rounded-r-lg"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
