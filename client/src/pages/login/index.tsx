import React from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';

//hooks
import { useInputState } from '../../hooks';
import { useAuth } from '../../hooks/useAuth';

//types
import { UserCredential } from '../../types/Auth';

//**********TODO***********
//LoginPage is very similar to RegisterPage
//Make the component and simply pass the different auth logic

const LoginPage = () => {
  const {
    actions: { signin, googleSignin },
  } = useAuth();

  const initialVal = {
    email: '',
    password: '',
  };
  const [userInfo, handleUserInfoChange] = useInputState(initialVal);

  const handleOnSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const { success, message } = await signin!(userInfo as UserCredential);

    console.log(success);

    //c'est dommage, unknown error occurred
    if (!success) {
      toast(message);
    }
  };

  return (
    <>
      <Center>
        <Border>
          <Title>Login</Title>
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
        </Border>
      </Center>
      <ToastContainer position='bottom-center' autoClose={5000} />
    </>
  );
};

export default LoginPage;

// styled
const Center = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Border = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  padding: 30px;
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
  padding-top: 10px;
  border-top: 1px solid #ddd;
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
  font-family: 'Permanent Marker', cursive;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
`;
