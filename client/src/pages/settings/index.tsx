import React from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';

//hooks
import { useInputState } from '../../hooks';
import { useAuth } from '../../hooks/useAuth';

//components
import { Loader } from '../../components';

//api
import { updateAdmin } from '../../api/admin';

//types
import { FirestoreSchool } from '../../types/Firestore';

const SettingsPage = () => {
  const {
    admin,
    loading,
    actions: { updateAdmin: updateAdminAction },
  } = useAuth();

  const initialVal = {
    uid: admin?.uid,
    admin: admin?.admin,
    name: admin?.name,
    // location: admin?.location,
  };

  const [adminInfo, handleAdminInfoChange] = useInputState(initialVal);

  const handleOnSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const { status, data } = await updateAdmin(adminInfo as FirestoreSchool);
    if (status === 200) {
      await updateAdminAction!(data.uid);
      toast('Successfully Updated');
    } else {
      toast('Oops, something went wrong 😈');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Center>
        <Border>
          <Wrapper onSubmit={handleOnSubmit}>
            <Title>Your School Information</Title>
            <Input
              onChange={handleAdminInfoChange}
              placeholder='Admin Email Address'
              type='email'
              required
              name='admin'
              value={adminInfo?.admin}
              disabled
            />
            <Input
              onChange={handleAdminInfoChange}
              placeholder='School Name'
              required
              name='name'
              value={adminInfo?.name}
              autoFocus
            />
            <Button type='submit'>Update</Button>
          </Wrapper>
        </Border>
      </Center>
      <ToastContainer position='bottom-center' autoClose={3000} />
    </>
  );
};

export default SettingsPage;

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

const Title = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  outline: none;
  padding: 8px 0;
  margin-bottom: 5px;
  &:disabled {
    cursor: not-allowed;
  }
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

const Border = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  padding: 30px;
`;
