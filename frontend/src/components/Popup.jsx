const Popup = ({ message, onClose }) => (
  <div className="popup">
    <div className="popup-inner">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default Popup;
