import React, { useState } from "react";
import styled from "styled-components";
import instance from "../../api/api";

const TodoList = ({ todos, state, setState }) => {
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState("");

  const checkHandler = async (todo) => {
    await instance
      .put(`todos/${todo.id}`, {
        todo: todo.todo,
        isCompleted: !todo.isCompleted,
      })
      .then(() => {
        setState(!state);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(todo);
  };

  const changeHandler = (e) => {
    setEditTodo(e.target.value);
  };

  const clickEditBtn = async (todo) => {
    await instance
      .put(`todos/${todo.id}`, {
        todo: editTodo,
        isCompleted: todo.isCompleted,
      })
      .then(() => {
        setState(!state);
        setEdit(false);
      });
  };

  const clickDeleteBtn = async (todo) => {
    await instance
      .delete(`todos/${todo.id}`)
      .then(() => {
        setState(!state);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      {todos &&
        todos.map((todo, index) => (
          <TodoListContainer key={todo.id}>
            <TodoListLabel>
              <input
                type="checkbox"
                id={todo.id}
                defaultChecked={todo.isCompleted ? true : false}
                onClick={() => checkHandler(todo)}
              />
            </TodoListLabel>
            {todo.id === edit ? (
              <>
                <TodoListEditInput
                  type="text"
                  data-testid="modify-input"
                  onChange={changeHandler}
                  value={editTodo}
                />
                <TodoListBtn
                  data-testid="submit-button"
                  onClick={() => clickEditBtn(todo)}
                >
                  제출
                </TodoListBtn>
                <TodoListBtn
                  data-testid="cancel-button"
                  onClick={() => setEdit(false)}
                >
                  취소
                </TodoListBtn>
              </>
            ) : (
              <>
                <Todos
                  style={{
                    textDecoration: todo.isCompleted ? "line-through" : "",
                  }}
                >
                  {todo.todo}
                </Todos>
                <TodoListBtn
                  data-testid="modify-button"
                  onClick={() => {
                    setEdit(todo.id);
                    setEditTodo(todo.todo);
                  }}
                >
                  수정
                </TodoListBtn>
                <TodoListBtn
                  data-testid="delete-button"
                  onClick={() => clickDeleteBtn(todo)}
                >
                  삭제
                </TodoListBtn>
              </>
            )}
          </TodoListContainer>
        ))}
    </Wrapper>
  );
};

export default TodoList;

const Wrapper = styled.div`
  width: 100%;
  height: 400px;
`;

const TodoListContainer = styled.li`
  display: flex;
  margin-bottom: 8px;
  padding: 5px;
  list-style-type: none;
  align-items: center;
`;

const TodoListLabel = styled.label`
  display: flex;
  margin-right: 10px;
`;

const TodoListEditInput = styled.input`
  width: 78%;
  border: 1px solid gray;

  &:focus {
    outline: 1px solid black;
  }
`;

const TodoListBtn = styled.button`
  border: none;
  color: white;
  background-color: black;
  cursor: pointer;
  width: 15%;
  border-radius: 3px;
  padding: 8px;
  font-size: 12px;
  margin-left: 5px;
`;

const Todos = styled.div`
  width: 80%;
  font-size: 15px;
`;
