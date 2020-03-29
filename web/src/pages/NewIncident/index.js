import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(event) {
    event.preventDefault();

    try {
      const data = {
        title,
        description,
        value
      };

      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');
    } catch (error) {
      alert('Failed to register a new incident, please try again.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the hero" />

          <h1>Register a new incident</h1>
          <p>Describes the incident to find some hero to solve.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Back
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <input
            placeholder="$ 0.00"
            value={value}
            onChange={event => setValue(event.target.value)}
          />
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
