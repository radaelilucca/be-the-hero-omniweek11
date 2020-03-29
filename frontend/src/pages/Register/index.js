import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {
  Container,
  Content,
  Section,
  Form,
  Input,
  InputGroup,
  Button,
} from './styles';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

export default function Register() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await api.post('/ongs', {
        name,
        email,
        whatsapp,
        city,
        uf,
      });

      // Trocar por sweet alert
      alert(`Anote o seu ID de acesso: ${response.data}`);
      history.push('/');
    } catch (error) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <Container>
      <Content>
        <Section>
          <img src={logo} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar
            os casos da sua ONG
          </p>
          <Link to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Já tenho cadastro
          </Link>
        </Section>
        <Form onSubmit={handleRegister}>
          <Input
            placeholder="Nome da Ong"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            placeholder="E-mail"
            value={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => {
              setWhatsapp(e.target.value);
            }}
          />
          <InputGroup>
            <Input
              placeholder="Cidade"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <Input
              placeholder="UF"
              value={uf}
              style={{ width: 80 }}
              onChange={(e) => {
                setUf(e.target.value);
              }}
            />
          </InputGroup>
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
}
