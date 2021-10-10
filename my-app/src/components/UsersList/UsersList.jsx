import React, { useState, useEffect } from 'react';
import User from '../User/User';

import './UsersList.css';

const UsersList = React.memo(({ newUsers }) => {
  const url = 'https://dummyapi.io/data/v1/user';
  const queryParams = {
    method: 'GET',
    headers: {
      'app-id': '6154537832884b1a024b2f3c',
      'Content-Type': 'application/json'
    }
  };
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const { data } = await fetch(url, queryParams).then(res => res.json());

    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="users-list">
      {newUsers.map(newUser => (
        <User key={newUser.id} {...newUser} />
      ))}
      {users.map(user => (
        <User key={user.id} {...user} />
      ))}
    </div>
  );
});

export default UsersList;
