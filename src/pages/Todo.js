import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../api/api";
import AddTodo from "../components/Todo/AddTodo";
import TodoList from "../components/Todo/TodoList";

const Todo = () => {
  const [todos, setTodos] = useState();
  const [state, setState] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getTodos = async () => {
    await instance
      .get("todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const LogOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    setTodos([]);
    getTodos();
    if (!token) {
      navigate("/signin");
    }
  }, [state, token]);

  return (
    <Wrapper>
      <LogoutBtnContainer>
        <LogoutBtn onClick={LogOut}>로그아웃</LogoutBtn>
      </LogoutBtnContainer>
      <TodoList todos={todos} state={state} setState={setState} />
      <AddTodo state={state} setState={setState} />
    </Wrapper>
  );
};

export default Todo;

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  margin: 30px;
  background: white;
  border: 1px solid black;
`;

const LogoutBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

const LogoutBtn = styled.button`
  cursor: pointer;
  background-color: black;
  color: white;
  padding: 8px;
  border-radius: 5px;
`;
