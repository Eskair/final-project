import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

//hooks
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks';

//api
import { createSprint } from '../../api/sprint';

//types
import { FirestoreSprint } from '../../types/Firestore';

const ClassroomPage = () => {
  const { admin, client } = useAuth();

  const {
    loading,
    data: sprints,
    setRefetchRequested,
  } = useFetch(`/api/sprints/${admin?.uid}/${client}`);

  const onAddSprint = async () => {
    const res = await createSprint({
      uid: admin?.uid as string,
      clientId: client as string,
    });
    //update sprints list
    setRefetchRequested((p) => !p);
  };

  useEffect(() => {
    setRefetchRequested((p) => !p);
  }, [admin, client]);

  //redirect to client login page
  if (!client) {
    return <Navigate replace to='/' />;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <FlexEnd>
        <Button onClick={onAddSprint}>Add sprint</Button>
      </FlexEnd>
      <CardWrapper>
        {sprints &&
          sprints.map((sprint: FirestoreSprint) => (
            <Card href={`/sprint/${sprint.id}`} key={sprint.id}>
              {sprint.title}
            </Card>
          ))}
      </CardWrapper>
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

const Card = styled.a`
  padding: 20px;
  border: 2px solid grey;
  margin: 10px;
  width: 120px;
  height: 100px;
  text-decoration: none;
  color: black;

  &:hover {
    cursor: pointer;
  }
`;

export default ClassroomPage;
