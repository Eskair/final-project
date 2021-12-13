import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

//hooks
import { useAuth } from '../../hooks/useAuth';
import { useFetch, useInputState } from '../../hooks';

//types
import { FirestoreProjection } from '../../types/Firestore';

//components
import { Modal, MultiSelector } from '../../components';

//api
import { updateSprint } from '../../api/sprint';

const SprintPage = () => {
  const { admin, client } = useAuth();
  const { sprintId } = useParams();

  const {
    loading,
    data: sprint,
    setRefetchRequested,
  } = useFetch(`/api/sprints/${admin?.uid}/${client}/${sprintId}`);

  const {
    loading: projectionLoading,
    data: projections,
    setRefetchRequested: projectionRefetch,
  } = useFetch(`/api/${admin?.uid}/${client}/${sprintId}/projections`);

  const [sprintInfo, handleSprintInfoChange, setSprintInfo] = useInputState({
    title: '',
    options: [],
    start: '',
    end: '',
  });

  useEffect(() => {
    setRefetchRequested((p) => !p);
    projectionRefetch((p) => !p);
  }, [admin, client]);

  useEffect(() => {
    sprint && setSprintInfo(sprint);
  }, [loading, sprint]);

  //update options from multiselector
  const setSprintOptions = (options: string[]) => {
    setSprintInfo({ ...sprintInfo, options });
  };

  //update a sprint doc
  const onClickUpdate = async (e: any) => {
    e.preventDefault();
    const { status } = await updateSprint({
      uid: admin?.uid as string,
      clientId: client as string,
      sprintId,
      updatedInfo: sprintInfo,
    });
    if (status === 200) {
      console.log('updated');
    } else {
      console.log('error');
    }
  };

  //redirect to client login page
  if (!client) {
    return <Navigate replace to='/' />;
  }

  //wait until fetching both data
  if (!sprintInfo || !projections) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Flex>
        <div>{sprintInfo.title}</div>
        <Modal>
          {/* sprint info setting */}
          <Form>
            <Input
              required
              placeholder='Title'
              name='title'
              value={sprintInfo.title}
              onChange={handleSprintInfoChange}
            />
            <MultiSelector
              options={sprintInfo.options}
              setSprintOptions={setSprintOptions}
            />

            <FlexEnd>
              <Button onClick={onClickUpdate}>Update</Button>
            </FlexEnd>
          </Form>
        </Modal>
      </Flex>
      <CardWrapper>
        {projections.map((projection: FirestoreProjection) => (
          <Card key={projection.id}>{projection.id}</Card>
        ))}
      </CardWrapper>
    </>
  );
};

//styled
const Form = styled.form``;

const Input = styled.input`
  margin-bottom: 10px;
  outline: none;
  border: 1px solid darkgray;
  &:focus {
    border: 2px solid pink;
  }
`;

const Button = styled.button`
  border: none;
  padding: 5px 10px;
  margin: 10px 0;
  &:hover {
    cursor: pointer;
  }
`;

const FlexEnd = styled.div`
  display: flex;
  justify-content: end;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Link = styled.a`
  text-decoration: none;
  color: white;
  padding: 5px 10px;
  display: inline-block;
  background: teal;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const Card = styled.div`
  padding: 20px;
  border: 2px solid grey;
  margin: 10px;
  width: 150px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default SprintPage;
