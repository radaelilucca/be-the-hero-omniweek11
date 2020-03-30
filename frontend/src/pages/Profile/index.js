import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiTrash2, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import { Container, Header, Button, PageController } from './styles';

import logo from '../../assets/logo.svg';

import api from '../../services/api';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const ongName = localStorage.getItem('ongName');
  const history = useHistory();

  function loadIncidents() {
    api
      .get('/profile', {
        params: { page },
      })
      .then((response) => {
        setIncidents(response.data.rows);
        setTotalPage(response.data.count / 4);
      });
  }

  async function handleLogout(e) {
    localStorage.clear();
    history.push('/');
  }

  async function handleDeleteIncident(id, title) {
    try {
      await api.delete(`incidents/delete/${id}`);
      Swal.fire({
        title: 'Sucesso',
        text: `Caso: ${title} deletado da base de dados com sucesso.`,
        icon: 'success',
        confirmButtonColor: '#e02041',
        confirmButtonText: 'Ok!',
      });
      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      // trocar por sweet alert
      alert('Não foi possível deletar - Tente novamente.');
    }
  }

  useEffect(() => {
    loadIncidents();
    console.log('PAGINA ATUAL', page);
    console.log('TOTAL E PAGINAS', totalPage);
  }, [page]);

  return (
    <Container>
      <Header>
        <img src={logo} alt="Be The Hero" />
        <span>
          Bem Vinda,
          <h4>{` ${ongName}`}</h4>
        </span>
        <Link to="/incidents/new">Cadastrar um novo caso</Link>
        <Button type="button" onClick={handleLogout}>
          <FiPower size={48} color="#e02048" />
        </Button>
      </Header>

      <h1> Casos Cadastrados </h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.amount)}
            </p>

            <button type="button">
              <FiTrash2
                size={20}
                color="#a8a8b3"
                onClick={() => {
                  handleDeleteIncident(incident.id, incident.title);
                }}
              />
            </button>
          </li>
        ))}
      </ul>
      <PageController>
        <Button
          onClick={() => {
            if (page !== 1) {
              setPage(page - 1);
            }
          }}
        >
          <FiSkipBack size={24} color="#fff" />
        </Button>
        <p>{page}</p>
        <Button
          onClick={() => {
            // console.log('QUANTIDADE DE PAGINAS', pagesQuantity);
            if (page !== totalPage) {
              setPage(page + 1);
            }
          }}
        >
          <FiSkipForward size={24} color="#fff" />
        </Button>
      </PageController>
    </Container>
  );
}
