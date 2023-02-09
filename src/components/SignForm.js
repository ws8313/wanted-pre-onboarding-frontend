import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../api/api";

const SignForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const match = useMatch("/signin");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const validEmail = () => {
    let exptext =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return exptext.test(email);
  };

  const isEmailValid = validEmail(email);
  const isFormValid = isEmailValid && password.length > 7;

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const changeEmail = (e) => {
    changeHandler(e);

    if (isEmailValid) {
      setErrorEmail("");
    } else {
      setErrorEmail("잘못된 이메일 양식입니다.");
    }
  };

  const changePassword = (e) => {
    changeHandler(e);

    if (password.length < 7) {
      setErrorPassword("비밀번호는 8자 이상이어야 합니다.");
    } else {
      setErrorPassword("");
    }
  };

  const SignUp = async () => {
    await instance
      .post("auth/signup", {
        email: email,
        password: password,
      })
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        setErrorPassword(error.response.data.message);
      });
  };

  const SignIn = async () => {
    await instance
      .post("auth/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data.access_token;
        localStorage.setItem("token", token);

        if (localStorage.getItem("token")) {
          window.location.assign("/todo");
        }
      })
      .catch((error) => {
        setErrorPassword(error.response.data.message);
      });
  };

  useEffect(() => {
    if (token) {
      navigate("/todo");
    }
  }, [token]);

  return (
    <Wrapper>
      <SignFormContainer>
        {match ? (
          <SignFormTitle>로그인</SignFormTitle>
        ) : (
          <SignFormTitle>회원가입</SignFormTitle>
        )}
        <SignFormInput
          name="email"
          type="email"
          data-testid="email-input"
          placeholder="abcd@wanted.co.kr"
          onChange={changeEmail}
          autoCapitalize="off"
          autoComplete="off"
          required
        />
        {<div>{errorEmail}</div>}
        <SignFormInput
          name="password"
          type="password"
          data-testid="password-input"
          placeholder="비밀번호를 8자 이상 입력해주세요."
          onChange={changePassword}
          minLength="8"
          autoCapitalize="off"
          autoComplete="off"
          required
        />
        {<div>{errorPassword}</div>}
        {match ? (
          <>
            <SignFormButton
              data-testid="signin-button"
              disabled={!isFormValid}
              onClick={SignIn}
            >
              로그인
            </SignFormButton>
            <SignFormLoginBtn
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </SignFormLoginBtn>
          </>
        ) : (
          <>
            <SignFormButton
              data-testid="signup-button"
              disabled={!isFormValid}
              onClick={SignUp}
            >
              회원가입
            </SignFormButton>
            <SignFormLoginBtn
              onClick={() => {
                navigate("/signin");
              }}
            >
              로그인
            </SignFormLoginBtn>
          </>
        )}
      </SignFormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignFormTitle = styled.h1`
  font-size: 20px;
`;

const SignFormInput = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 20px;
  background-color: white;
  margin: 20px 0 10px 0;
  font-size: 15px;
  color: black;
`;

const SignFormButton = styled.button`
  width: 100%;
  padding: 15px;
  border-radius: 20px;
  margin: 20px 0 10px 0;
  font-size: 15px;
  text-align: center;
  color: black;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;

const SignFormLoginBtn = styled.span`
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
`;

export default SignForm;
