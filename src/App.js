import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MainPage from "./pages/MainPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  align-content: center;
`;
