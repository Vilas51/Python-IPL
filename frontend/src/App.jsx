import React, { useState } from 'react';
import axios from 'axios';
import ResultCard from './components/ResultCard';
import Popup from './components/Popup';
import './styles.css';

const teams = [
  'Mumbai Indians', 'Chennai Super Kings', 'Royal Challengers Bangalore',
  'Kolkata Knight Riders', 'Sunrisers Hyderabad', 'Rajasthan Royals',
  'Delhi Capitals', 'Lucknow Super Giants', 'Gujarat Titans', 'Punjab Kings'
];

const App = () => {
  const [form, setForm] = useState({ team1: '', team2: '', fromYear: '', toYear: '' });
  const [results, setResults] = useState(null);
  const [popup, setPopup] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { team1, team2, fromYear, toYear } = form;

    // Basic validation
    if (!team1 || !team2 || !fromYear || !toYear || team1 === team2) {
      setPopup('Please select two different teams and valid years.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/query', {
        FirstTeam: team1,
        SecondTeam: team2,
        FromYear: parseInt(fromYear),
        ToYear: parseInt(toYear)
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
      setPopup('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="app">
      <h1>IPL Team Analyzer</h1>

      <form onSubmit={handleSubmit} className="form">
        <select onChange={(e) => setForm({ ...form, team1: e.target.value })}>
          <option value="">Select Team 1</option>
          {teams.map((team, idx) => (
            <option key={idx} value={team}>{team}</option>
          ))}
        </select>

        <select onChange={(e) => setForm({ ...form, team2: e.target.value })}>
          <option value="">Select Team 2</option>
          {teams.map((team, idx) => (
            <option key={idx} value={team}>{team}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="From Year"
          onChange={(e) => setForm({ ...form, fromYear: e.target.value })}
        />
        <input
          type="number"
          placeholder="To Year"
          onChange={(e) => setForm({ ...form, toYear: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>

      {popup && <Popup message={popup} onClose={() => setPopup('')} />}

      {results && (
        <div className="results">
          <ResultCard title="Head to Head Wins" data={results.headToHead} />
          <ResultCard title="Most Runs" data={results.mostRuns} />
          <ResultCard title="Best Strike Rate" data={results.bestStrikeRate} />
          <ResultCard title="Most Wickets" data={results.mostWickets} />
        </div>
      )}
    </div>
  );
};

export default App;
