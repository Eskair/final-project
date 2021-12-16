import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//components
import { Loader } from '../../components';

//hooks
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks';

//api
import { createSprint } from '../../api/sprint';
import { createProjection } from '../../api/projection';

//types
import { FirestoreSprint } from '../../types/Firestore';

const ClassroomPage = () => {
  const navigate = useNavigate();
  const { admin, client } = useAuth();

  const {
    loading,
    data: sprints,
    setRefetchRequested,
  } = useFetch(`/api/admins/${admin?.uid}/clients/${client}/sprints`);

  const onAddSprint = async () => {
    const { status } = await createSprint({
      uid: admin?.uid as string,
      clientId: client as string,
    });
    //update sprints list
    status === 200 && setRefetchRequested((p) => !p);
  };

  useEffect(() => {
    //refresh sprint data on admin/client change
    setRefetchRequested((p) => !p);
  }, [admin, client]); // eslint-disable-line

  const onStartNewProjection = async (sprintId: string) => {
    // create a new projection doc
    const { status, data: projectionId } = await createProjection({
      uid: admin?.uid as string,
      clientId: client as string,
      sprintId,
    });

    if (status === 200) {
      //go to the newly created projection view
      navigate(`/sprints/${sprintId}/projections/${projectionId}`, {
        replace: true,
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <FlexEnd>
        <Button onClick={onAddSprint}>Add sprint</Button>
      </FlexEnd>
      <CardWrapper>
        {sprints &&
          sprints.map((sprint: FirestoreSprint) => (
            <Card key={sprint.id}>
              {sprint.title}
              <FlexColumn>
                <Link href={`/sprints/${sprint.id}`}>Dashboard</Link>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onStartNewProjection(sprint.id);
                  }}
                >
                  New projection
                </Button>
              </FlexColumn>
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

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  padding: 5px 10px;
  font-family: 'Permanent Marker', cursive;
  &:hover {
    cursor: pointer;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
`;

const Link = styled.a`
  text-decoration: none;
  color: white;
  padding: 5px 10px;
  display: inline-block;
  background: teal;
  text-align: center;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const Card = styled.div`
  padding: 20px;
  /* border: 2px solid grey; */
  margin: 10px;
  width: 150px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
`;

export default ClassroomPage;
