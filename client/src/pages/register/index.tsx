import React from 'react';
import styled from 'styled-components';

//hooks
import { useInputState } from '../../hooks';
import { useAuth } from '../../hooks/useAuth';

const RegisterPage = () => {
  const {
    actions: { googleSignin },
  } = useAuth();

  const initialVal = {
    email: '',
    password: '',
    code: '',
  };
  const [userInfo, handleUserInfoChange] = useInputState(initialVal);

  const handleOnSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(userInfo);
  };

  return (
    <Center>
      <Wrapper onSubmit={handleOnSubmit}>
        <Input
          onChange={handleUserInfoChange}
          placeholder='Email'
          type='email'
          required
          name='email'
          value={userInfo?.email}
        />
        <Input
          onChange={handleUserInfoChange}
          placeholder='Password'
          type='password'
          required
          name='password'
          value={userInfo?.password}
        />
        <Input
          onChange={handleUserInfoChange}
          placeholder='School code'
          required
          name='code'
          value={userInfo?.code}
        />
        <Button type='submit'>Submit</Button>
      </Wrapper>
      <GoogleWrapper>
        <Button
          onClick={async () => {
            googleSignin && (await googleSignin());
          }}
        >
          Signin with Google
        </Button>
      </GoogleWrapper>
    </Center>
  );
};

export default RegisterPage;

// styled
const Center = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const GoogleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const Input = styled.input`
  outline: none;
  padding: 8px 0;
  margin-bottom: 5px;
`;
const Button = styled.button`
  border: none;
  padding: 10px 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;
