import styled from "styled-components"

export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`

export const SuggestionButton = styled.button`
  padding: 5px;
  background-color: #fff;
  color: #000;
  border: 1px solid #dedede;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background-color: #dedede;
  }
`