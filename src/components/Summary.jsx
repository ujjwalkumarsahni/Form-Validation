import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Summary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state)
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-red-100 text-red-700 rounded-md shadow-md text-center">
        <p className="text-lg font-semibold">No data submitted</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Back to Form
        </button>
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Submitted Data</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-80 text-sm font-mono">
        {JSON.stringify(state, null, 2)}
      </pre>
      <button
        onClick={() => navigate('/')}
        className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        Back to Form
      </button>
    </div>
  );
}

export default Summary;
