import styled from 'styled-components';

export const Container = styled.div`
  li {
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    position: relative;
  }
`;

export const CaseProperty = styled.text`
  display: block;
  margin-bottom: 8px;
  margin-top: 10px;
  color: #41414d;
  font-weight: bold;
  font-size: 18px;
`;

export const PropertyValue = styled.text`
  color: #737380;
  line-height: 38px;
  font-size: 16px;
`;

export const EditButton = styled.button`
  position: absolute;
  right: 24px;
  top: 230px;
  border: 0;

  &:hover {
    opacity: 0.7;
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;
  border: 0;

  &:hover {
    opacity: 0.7;
  }
`;
