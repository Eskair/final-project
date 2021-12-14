import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

//hooks
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks';

//api
import { updateProjection } from '../../api/projection';

const ProjectionPage = () => {
  const navigate = useNavigate();

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
        {/* end projection and go to the sprint dashboard */}
        <EndButton
          onClick={() => {
            navigate(`/sprints/${sprintId}`, {
              replace: true,
            });
          }}
        >
          End Projection
        </EndButton>
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
  padding: 20px 10px;
  margin: 10px 0;
  &:hover {
    cursor: pointer;
  }
`;

const EndButton = styled.button`
  border: none;
  padding: 10px 10px;
  margin: 10px 0;
  color: white;

  background: #77a1d3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #e684ae,
    #79cbca,
    #77a1d3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #e684ae,
    #79cbca,
    #77a1d3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  &:hover {
    cursor: pointer;
  }
`;

export default ProjectionPage;
