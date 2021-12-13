import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

//hooks
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks';

//api
import { updateProjection } from '../../api/projection';

//types
import { FirestoreSprint } from '../../types/Firestore';

const ProjectionPage = () => {
  const { sprintId, projectionId } = useParams();

  const { admin, client } = useAuth();

  const {
    loading,
    data: sprint,
    setRefetchRequested,
  } = useFetch(`/api/sprints/${admin?.uid}/${client}/${sprintId}`);

  useEffect(() => {
    setRefetchRequested((p) => !p);
  }, [admin, client]);

  //increment option count on projection docs
  const onOptionClick = async (clicked: string) => {
    const { status } = await updateProjection({
      uid: admin?.uid as string,
      clientId: client as string,
      sprintId: sprintId as string,
      projectionId,
      clicked,
    });
    if (status === 200) {
      console.log('success');
    }
  };

  if (!sprint) {
    return <div>Loading</div>;
  }

  return (
    <Wrapper>
      <FlexColumn>
        {sprint.options.map((option: string) => (
          <Button
            onClick={(e: any) => {
              e.preventDefault();
              onOptionClick(option);
            }}
            key={option}
          >
            {option}
          </Button>
        ))}
      </FlexColumn>
    </Wrapper>
  );
};

//styled
const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border: none;
  padding: 5px 10px;
  margin: 10px 0;
  &:hover {
    cursor: pointer;
  }
`;

export default ProjectionPage;
