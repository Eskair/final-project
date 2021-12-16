import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';

//hooks
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks';

//api
import { updateProjection } from '../../api/projection';

//components
import { Loader } from '../../components';

const ProjectionPage = () => {
  const navigate = useNavigate();

  const { sprintId, projectionId } = useParams();

  const { admin, client } = useAuth();

  const { data: sprint, setRefetchRequested } = useFetch(
    `/api/admins/${admin?.uid}/clients/${client}/sprints/${sprintId}`
  );

  useEffect(() => {
    setRefetchRequested((p) => !p);
  }, [admin, client]); // eslint-disable-line

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
      toast('Thank you!');
    }
  };

  if (!sprint) {
    return <Loader />;
  }

  return (
    <>
      <Wrapper>
        <Title>{sprint.title}</Title>
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
      <ToastContainer position='bottom-center' autoClose={1000} />
    </>
  );
};

//styled
const Wrapper = styled.div`
  position: absolute;
  top: 40%;
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
  font-family: 'Permanent Marker', cursive;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  &:hover {
    cursor: pointer;
  }
`;

const EndButton = styled.button`
  border: none;
  padding: 10px 10px;
  margin: 10px 0;
  color: white;
  font-family: 'Permanent Marker', cursive;
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

const Title = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

export default ProjectionPage;
