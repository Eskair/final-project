import React from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//hooks
import { useAuth } from '../../hooks/useAuth';
import { useInputState } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export const ClientLoginModal = () => {
  const {
    actions: { updateClient },
  } = useAuth();

  const initialVal = {
    client: '',
  };

  const navigate = useNavigate();

  const [clientInfo, clientInfoChange] = useInputState(initialVal);

  const handleOnSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    //enter the classroom logic
    //if client doesn't exist, it will create a new client
    const success = await updateClient!(clientInfo?.client as string);

    if (success) {
      navigate('/classroom', { replace: true });
    } else {
      //toast for when the client is not found
      toast('Oops, something went wrong 😈');
    }
  };
  return (
    <>
      <Center>
        <Wrapper onSubmit={handleOnSubmit}>
          <Input
            type='email'
            required
            placeholder='Enter a client email adress'
            name='client'
            onChange={clientInfoChange}
          />
          <Button type='submit'>Enter the classroom</Button>
        </Wrapper>
      </Center>
      <ToastContainer position='bottom-center' />
    </>
  );
};

// styled
const Center = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.form`
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
  font-family: 'Permanent Marker', cursive;
  &:hover {
    cursor: pointer;
  }
`;
