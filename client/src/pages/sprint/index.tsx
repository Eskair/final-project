import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

//hooks
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks';

//types
import { FirestoreSprint } from '../../types/Firestore';

const SprintPage = () => {
  const { admin, client } = useAuth();
  const { sprintId } = useParams();

  const {
    loading,
    data: sprint,
    setRefetchRequested,
  } = useFetch(`/api/sprints/${admin?.uid}/${client}/${sprintId}`);

  useEffect(() => {
    setRefetchRequested((p) => !p);
  }, [admin, client]);

  useEffect(() => {
    console.log('here', sprint);
  }, [sprint]);

  //redirect to client login page
  if (!client) {
    return <Navigate replace to='/' />;
  }

  return (
    <>
      <div>{sprint && sprint.title}</div>
    </>
  );
};

//styled
const FlexEnd = styled.div`
  display: flex;
  justify-content: end;
`;

const Button = styled.button`
  border: none;
  padding: 5px 10px;
  &:hover {
    cursor: pointer;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  padding: 20px;
  border: 2px solid grey;
`;

export default SprintPage;
