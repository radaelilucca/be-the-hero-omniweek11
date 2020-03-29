import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';

import { Container, SectionForm, Form, Button } from './styles';

import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

import api from '../../services/api';

export default function Logon() {
  const history = useHistory();
  const [id, setId] = useState('');

  const logged = localStorage.getItem('id');

  if (logged) {
    history.push('/profile');
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post(`/sessions/${id}`);

      localStorage.setItem('id', response.data.id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      // trocar por sweet alert
      // eslint-disable-next-line no-alert
      alert('ID Invalido, verifique o ID digitado e tente novamente.');
    }
  }

  return (
    <Container>
      <SectionForm>
        <img src={logo} alt="Be The Hero" />
        <Form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <Button type="submit">Entrar</Button>
          <Link to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </Form>
      </SectionForm>
      <img src={heroesImg} alt="heroes" />
    </Container>
  );
}
