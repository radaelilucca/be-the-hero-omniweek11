import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1180px;
  padding: 30px;
  margin: 5px auto;

  h1 {
    margin-top: 36px;
    margin-bottom: 15px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 20px;
    margin-left: 24px;
  }

  img {
    height: 64px;
  }

  a {
    width: 260px;
    margin-left: auto;
    margin-top: 0;
    height: 60px;
    background: #e02041;
    border: 0;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    line-height: 60px;
    transition: filter 0.2s;
    margin-right: 16px;

    &:hover {
      filter: brightness(90%);
    }
  }
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

export const PageController = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  width: 100%;

  p {
    font-size: 20px;
    color: #e02041;
    font-weight: bold;
  }

  Button {
    background: #e02041;
  }
`;
