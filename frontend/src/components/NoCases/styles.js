import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  margin-top: 90px;
  border-radius: 10px;
  width: 100%;
`;

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ec1b42;
  height: 30vh;
  margin-top: 200px;
  margin-bottom: 50px;
  border-radius: 20px;
  width: 350px;
`;
export const NotFound = styled.text`
  font-size: 180px;
  line-height: 200px;
  font-weight: bold;
  color: #eee;
`;
export const Title = styled.text`
  font-size: 50px;
  line-height: 80px;
  font-weight: bold;
  color: #ec1b42;
  text-align: center;
  margin-top: 40px;
`;
export const Description = styled.text`
  font-size: 40px;
  line-height: 80px;
  font-weight: 500;
  color: #ec1b42;
  text-align: center;
`;

export const Button = styled.button`
  height: 60px;
  width: 60px;
  border-radius: 4px;
  border: 1px solid #dcdce6;
  background: transparent;

  transition: border-color 0.2s;

  &:hover {
    border-color: #999;
  }
`;
