import { useState } from 'react';

import './UserSection.css';

const UserSection = ({ addNewUser }) => {
  const url = 'https://dummyapi.io/data/v1/user/create';
  const [formOpen, setFormOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const userInfo = {
    firstName: name,
    lastName: surname,
    email,
    picture: avatar
  };

  const clearForm = () => {
    setTitle('');
    setName('');
    setSurname('');
    setEmail('');
    setAvatar('');
  };

  const createUser = async () => {
    if (title) userInfo.title = title;

    const newUser = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'app-id': '6154537832884b1a024b2f3c',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());

      if (newUser.error) {
        alert('Error');

        return;
      }

      alert('Succes');
      addNewUser(newUser);
  };

  const addUser = (event) => {
    event.preventDefault();
    clearForm();
    createUser();
    setFormOpen(false)
  };

  return (
    <div className="user-section">
      <button
        className="user-section__button"
        onClick={() => setFormOpen(!formOpen)}
      >
        {formOpen ? 'Close' : 'Open'} form
      </button>

      {formOpen && (
        <form
        className="user-section__form"
        onSubmit={addUser}
      >
        <select
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        >
          <option value="">Choose a title</option>
          <option value="mr">mr</option>
          <option value="mrs">mrs</option>
          <option value="ms">ms</option>
          <option value="miss">miss</option>
          <option value="dr">dr</option>
        </select>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="First name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="surname"
          value={surname}
          placeholder="Last name"
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="avatar"
          value={avatar}
          placeholder="Avatar URL"
          onChange={(e) => setAvatar(e.target.value)}
        />
        <button>Add user</button>
      </form>
      )}
    </div>
  );
};

export default UserSection;
