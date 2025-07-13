import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 500px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: Arial, sans-serif;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    border: none;
  }
`