import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: 80vh;

  h1 {
    font-size: 26px;
    color: #41414d;
  }
`;

export const IncidentsContainer = styled.div`
  max-width: 1130px;
  width: 90vw;
  min-height: 68vh;

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 22px;
    list-style: none;
  }
`;

export const PageController = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  justify-self: flex-end;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  height: 100%;

  p {
    font-size: 22px;
    color: #e02041;
    font-weight: bold;
  }
`;

export const Button = styled.button`
  height: 60px;
  width: 60px;
  border-radius: 15px;
  border: 1px solid #dcdce6;
  background: transparent;
  transition: border-color 0.2s;
  background: #e02041;

  &:hover {
    border-color: #999;
  }
`;
