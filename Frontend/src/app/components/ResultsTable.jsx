const ResultsTable = ({ results }) => {
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
                            <th key={key} className="border px-4 py-2 text-left font-medium">
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

export default ResultsTable;
