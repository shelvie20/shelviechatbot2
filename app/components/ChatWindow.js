import styled from "styled-components"

export const ChatWindow = styled.div`
  height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  flex-grow: 1;

  @media (max-width: 768px) {
    padding: 0;
    border: none;
  }
`

export const ChatMessage = styled.div`
  margin: 5px 0;
  display: flex;
  justify-content: ${(props) => props.user === "bot" ? "flex-start" : "flex-end"};
  
  .message {
    width: 80%;
    border-radius: 5px;
    padding: 5px 8px;
    background-color: ${(props) => props.user === "bot" ? "#FF7F3E" : "#80C4E9"};
    font-size: 14px;
  }
`