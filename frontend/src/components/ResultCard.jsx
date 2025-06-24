const ResultCard = ({ title, data }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {typeof data === 'object' ? (
        <ul>
          {Object.entries(data).map(([key, val]) => (
            <li key={key}><strong>{key}:</strong> {val}</li>
          ))}
        </ul>
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
};

export default ResultCard;
