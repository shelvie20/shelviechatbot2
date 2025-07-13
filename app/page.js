"use client"
import React, { useState, useRef } from "react"
import { Container } from "./components/Container"
import { ChatWindow, ChatMessage } from "./components/ChatWindow"
import { InputContainer, Input } from "./components/Input"
import { Button, SuggestionButton } from "./components/Button"
import { BOT_DATA } from "./utils/constans/response"
import { Title } from "./components/Title"
import Fuse from "fuse.js";

export default function Home() {
  const containerRef = useRef(null);
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [tempSuggestion, setTempSuggestion] = useState([])

  const handleScrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleSend = (keyword) => {
    if (!keyword.trim()) return

    const options = {
      keys: ["question"], // Properti untuk dicocokkan
      threshold: 0.4,     // Semakin rendah, semakin ketat pencocokan
    };

    let response = "Sorry, we don't understand your question"
    const userMessage = { text: keyword, userType: "user" }
    setMessages((prev) => [...prev, userMessage])

    const fuse = new Fuse(BOT_DATA, options);
    const botResponse = fuse.search(keyword).map((res) => res.item); // Hanya ambil item hasil pencarian
    console.log("result", botResponse)

    // const botResponse =
    //   BOT_DATA.filter(
    //     (item) => item.question.toLowerCase().includes(keyword.toLowerCase())
    //   )

    if (botResponse.length > 1) {
      const findResponse = botResponse.find((item) => item.question.toLowerCase() === keyword.toLowerCase())

      if (findResponse) {
        response = findResponse?.response
      } else {
        response = "Perhaps this is what you meant."
        setTempSuggestion(botResponse)
      }
    } else if (botResponse.length === 1) {
      response = botResponse[0]?.response
    }

    const botMessage = { text: response, userType: "bot" }

    setMessages((prev) => [...prev, botMessage])

    setTimeout(() => {
      setInput("")
      handleScrollToBottom()
    }, 500);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission if in a form
      handleSend(input)
    }
  }

  const handleSendSuggestion = (keyword) => {
    handleSend(keyword)
    setTempSuggestion([])
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <Container>
        <Title>Tanya Bimo</Title>
        <ChatWindow ref={containerRef} >
          {messages.map((msg, index) => (
            <ChatMessage key={"message" + index} user={msg.userType}>
              <div className="message">
                {msg.text}
              </div>
            </ChatMessage>
          ))}
        </ChatWindow>
        <div className="flex flex-col gap-2 mb-2">
          {tempSuggestion.slice(0, 3).map((suggest, idx) => {
            return (
              <SuggestionButton onClick={() => handleSendSuggestion(suggest.question)} key={"suggesst" + idx}>{suggest.question}</SuggestionButton>
            )
          })}
        </div>
        <InputContainer>
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={() => handleSend(input)}>Send</Button>
        </InputContainer>
      </Container>
    </main>
  );
}
