import React from 'react';
import {
  Container,
  Title,
  Description,
  NotFound,
  NotFoundContainer,
} from './styles';

export default function NoCases() {
  return (
    <Container>
      <NotFoundContainer>
        <NotFound>404</NotFound>
      </NotFoundContainer>
      <Title> Parece que sua ONG não possui nenhum caso.</Title>
      <Description>
        Regristre novos casos e encontre heróis agora mesmo!
      </Description>
    </Container>
  );
}
