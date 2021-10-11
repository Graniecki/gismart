import './Popup.css';

const Popup = ({ status }) => (
  <div className={`pop-up ${status}`}>
    {status}
  </div>
);

export default Popup;
