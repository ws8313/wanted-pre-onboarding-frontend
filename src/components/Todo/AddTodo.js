import React, { useState } from "react";
import styled from "styled-components";
import instance from "../../api/api";

const AddTodo = ({ state, setState }) => {
  const [todo, setTodo] = useState("");

  const changeHandler = (e) => {
    setTodo(e.target.value);
  };

  const clickHandler = async () => {
    await instance
      .post("todos", {
        todo: todo,
      })
      .then(() => {
        setState(!state);
        setTodo("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <TodoInput
        type="text"
        value={todo}
        onChange={changeHandler}
        data-testid="new-todo-input"
        placeholder="할 일을 입력하세요"
      />
      <TodoAddBtn data-testid="new-todo-add-button" onClick={clickHandler}>
        추가
      </TodoAddBtn>
    </Wrapper>
  );
};

export default AddTodo;

const Wrapper = styled.div`
  display: flex;
`;

const TodoInput = styled.input`
  width: 100%;
  padding: 15px;
  background-color: white;
  font-size: 15px;
  color: black;
  border: 1px solid black;
`;

const TodoAddBtn = styled.button`
  border: none;
  color: white;
  background-color: black;
  cursor: pointer;
  width: 20%;
  padding: 8px;
  font-size: 15px;
`;
