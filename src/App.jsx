import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    document.title = "ABCD123"; // Replace with your roll number
  }, []);

  const handleSubmit = async () => {
    setError('');
    try {
      const payload = JSON.parse(jsonInput);
      const response = await axios.post('https://bfhl-backend-g31a.onrender.com/bfhl', payload);
      setResponseData(response.data);
    } catch (err) {
      setError('Invalid JSON input or error in backend call.');
    }
  };

  const filterOptions = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest alphabet', label: 'Highest alphabet' }
  ];

  const renderResponse = () => {
    if (!responseData) return null;
    const output = {};
    selectedFilters.forEach(filter => {
      if (filter.value === 'Alphabets') output.alphabets = responseData.alphabets;
      if (filter.value === 'Numbers') output.numbers = responseData.numbers;
      if (filter.value === 'Highest alphabet') output.highest_alphabet = responseData.highest_alphabet;
    });
    return <pre>{JSON.stringify(output, null, 2)}</pre>;
  };

  return (
    <div className="App">
      <h1>Task Completed</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON e.g. { "data": ["A", "C", "z"] }'
        rows="5"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h3>Select Filters</h3>
        <Select
          isMulti
          options={filterOptions}
          value={selectedFilters}
          onChange={setSelectedFilters}
        />
      </div>

      <h3>Response</h3>
      {renderResponse()}
    </div>
  );
}

export default App;
