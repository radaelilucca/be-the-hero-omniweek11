/* eslint-disable react/prop-types */
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { Container, CaseProperty, PropertyValue } from './styles';

export default function IncidentCard({ incident, handleDeleteIncident }) {
  return (
    <Container>
      <li key={incident.id}>
        <CaseProperty>CASO:</CaseProperty>
        <PropertyValue>{incident.title}</PropertyValue>
        <CaseProperty>DESCRIÇÃO:</CaseProperty>
        <PropertyValue>{incident.description}</PropertyValue>
        <CaseProperty>VALOR:</CaseProperty>
        <PropertyValue>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(incident.amount)}
        </PropertyValue>

        <button type="button">
          <FiTrash2
            size={20}
            color="red"
            onClick={() => {
              handleDeleteIncident(incident.id, incident.title);
            }}
          />
        </button>
      </li>
    </Container>
  );
}
