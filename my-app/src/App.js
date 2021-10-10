import { useState } from 'react';

import UsersList from './components/UsersList/UsersList';
import UserSection from './components/UserSection/UserSection';

import './App.css';

const App = () => {
  const [newUsers, setNewUsers] = useState([]);

  const addNewUser = (user) => {
    setNewUsers(prev => [
      user,
      ...prev
    ]);
  };

  return (
    <div className="App">
      <div className="container">
        <UsersList newUsers={newUsers} />
        <UserSection addNewUser={addNewUser} />
      </div>
    </div>
  );
}

export default App;
