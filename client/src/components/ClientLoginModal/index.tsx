import React from 'react';
import styled from 'styled-components';

//hooks
import { useAuth } from '../../hooks/useAuth';
import { useInputState } from '../../hooks';

//apis
import { getClient } from '../../api/client';

export const ClientLoginModal = () => {
  const {
    admin,
    actions: { updateClient },
  } = useAuth();

  const initialVal = {
    client: '',
  };
  const [clientInfo, clientInfoChange] = useInputState(initialVal);

  const handleOnSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    //enter the classroom logic
    updateClient && (await updateClient(clientInfo.client as string));
  };
  return (
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
  &:hover {
    cursor: pointer;
  }
`;
