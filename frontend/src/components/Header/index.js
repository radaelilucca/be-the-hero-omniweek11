import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiPower } from 'react-icons/fi';
import { Container, Button, NewCaseButton } from './styles';

import logo from '../../assets/logo.svg';

export default function Header() {
  const history = useHistory();
  const ongName = localStorage.getItem('ongName');

  // eslint-disable-next-line no-unused-vars
  async function handleLogout(e) {
    localStorage.clear();
    history.push('/');
  }

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Be The Hero" />
      </Link>
      <span>
        Bem Vinda,
        <h4>{` ${ongName}`}</h4>
      </span>
      <NewCaseButton>
        <Link to="/incidents/new">Novo Caso</Link>
      </NewCaseButton>

      <Button type="button" onClick={handleLogout}>
        <FiPower size={48} color="#fff" />
      </Button>
    </Container>
  );
}
