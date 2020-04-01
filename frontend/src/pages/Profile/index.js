import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import Swal from 'sweetalert2';

import { Container, Header, Button, PageController } from './styles';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  // eslint-disable-next-line camelcase
  const ong_id = localStorage.getItem('id');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  function loadIncidents() {
    api
      .get('/profile', {
        params: { page },
      })
      .then((response) => {
        setIncidents(response.data.rows);
        setTotalPage(Math.floor(Math.ceil(response.data.count / 4)));
        console.log('total page no laod', totalPage);
      });
  }

  async function handleLogout(e) {
    localStorage.clear();
    history.push('/');
  }

  async function handleDeleteIncident(id, title) {
    await Swal.fire({
      title: 'Deletar Caso',
      text: `Você tem certeza que quer deletar o caso ${title}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#e02041',
      confirmButtonColor: '#444',
      reverseButtons: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.value) {
        try {
          await api.delete(`incidents/delete/${id}`);
          console.log('total', totalPage);
          console.log('atal', page);
          loadIncidents();
          console.log('loaded');
          console.log('VERFIC', totalPage !== page);
          if (totalPage !== page) {
            setPage(page - 1);
          }
          console.log('total', totalPage);
          console.log('atal', page);
          Swal.fire({
            title: 'Sucesso',
            text: `Caso ${title} deletado com sucesso.`,
            icon: 'success',
            confirmButtonColor: '#e02041',
            confirmButtonText: 'Okay',
          });
        } catch (error) {
          // trocar por sweet alert
          Swal.fire({
            title: 'Que pena.',
            text: `Caso: ${title} não pode ser deletado. Tente novamente.`,
            icon: 'error',
            confirmButtonColor: '#e02041',
            confirmButtonText: 'Okay',
          });
        }
      }
    });
  }

  useEffect(() => {
    loadIncidents();
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
