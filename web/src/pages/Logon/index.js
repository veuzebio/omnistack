import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post('login', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      alert('Login error, try again.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the hero" />
        <form onSubmit={handleLogin}>
          <h1>Logon</h1>
          <input
            placeholder="Your ID"
            value={id}
            onChange={event => setId(event.target.value)}
          />
          <button className="button" type="submit">
            Sign in
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />I don't have an account
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
