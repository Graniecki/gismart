import { useState } from 'react';

import UsersList from './components/UsersList/UsersList';
import UserSection from './components/UserSection/UserSection';
import Popup from './components/Popup/Popup';

import './App.css';

const App = () => {
  const [newUsers, setNewUsers] = useState([]);
  const [popupOpen, setPopupOpen] = useState(true);

  setTimeout(() => {
    setPopupOpen(false);
  }, 5000);

  const addNewUser = (user) => {
    setNewUsers(prev => [
      user,
      ...prev
    ]);
  };

  const activatePopup = (status) => {
    setPopupOpen(status);
  };

  return (
    <div className="App">
      <div className="container">
        <UsersList newUsers={newUsers} />
        <UserSection
          addNewUser={addNewUser}
          activatePopup={activatePopup}
        />
        {popupOpen && (
          <Popup status={popupOpen} />
        )}
      </div>
    </div>
  );
}

export default App;
