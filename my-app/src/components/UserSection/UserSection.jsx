import { useState, useRef } from 'react';
import classNames from 'classnames';

import './UserSection.css';

const UserSection = ({ addNewUser, activatePopup }) => {
  const url = 'https://dummyapi.io/data/v1/user/create';
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const emailRef = useRef(null);
  const userInfo = {
    firstName: name,
    lastName: surname,
    email,
    picture: avatar
  };

  const handleFormField = (event, callback, ref) => {
    const { value } = event.target;

    callback(value);

    if (!ref) return;

    value
      ? ref.current.classList.remove('danger')
      : ref.current.classList.add('danger');
  };

  const clearForm = () => {
    setTitle('');
    setName('');
    setSurname('');
    setEmail('');
    setAvatar('');
  };

  const fieldValidation = () => {
    name
      ? nameRef.current.classList.remove('danger')
      : nameRef.current.classList.add('danger');

    surname
      ? surnameRef.current.classList.remove('danger')
      : surnameRef.current.classList.add('danger');

    email
      ? emailRef.current.classList.remove('danger')
      : emailRef.current.classList.add('danger');

    setEmailValid(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
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
        activatePopup('error');

        return;
      }

      activatePopup('success');
      addNewUser(newUser);
  };

  const addUser = (event) => {
    const validation = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    event.preventDefault();
    fieldValidation();

    if (!name || !surname || !email || !validation) return;

    createUser();
    clearForm();
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
          onChange={(event) => handleFormField(event, setTitle)}
        >
          <option value="">Choose a title</option>
          <option value="mr">mr</option>
          <option value="mrs">mrs</option>
          <option value="ms">ms</option>
          <option value="miss">miss</option>
          <option value="dr">dr</option>
        </select>
        <div className="field-wrapper" ref={nameRef}>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="First name"
            onChange={(event) => handleFormField(event, setName, nameRef)}
          />
        </div>
        <div className="field-wrapper" ref={surnameRef}>
          <input
            type="text"
            name="surname"
            value={surname}
            placeholder="Last name"
            onChange={(event) => handleFormField(event, setSurname, surnameRef)}
          />
        </div>
        <div
          ref={emailRef}
          className={classNames("field-wrapper", {
            "email-error": !emailValid
          })}
        >
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(event) => handleFormField(event, setEmail, emailRef)}
          />
        </div>
        <input
          type="text"
          name="avatar"
          value={avatar}
          placeholder="Avatar URL"
          onChange={(event) => handleFormField(event, setAvatar)}
        />
        <button>Add user</button>
      </form>
      )}
    </div>
  );
};

export default UserSection;
