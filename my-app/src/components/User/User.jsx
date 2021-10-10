import './User.css';

const User = ({ firstName, lastName, title, picture }) => (
  <div className="user-info">
    <div className="user-info__photo">
      <img src={picture} alt={`${firstName} ${lastName}`} />
    </div>
    <p className="user-info__description">
      {`${title || ''} ${firstName} ${lastName}`}
    </p>
  </div>
);

export default User;
