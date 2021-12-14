import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//hooks
import { useAuth } from '../../hooks/useAuth';
import { useFetch, useInputState } from '../../hooks';

//components
import { Modal, MultiSelector, LineChart } from '../../components';

//api
import { updateSprint } from '../../api/sprint';

const SprintPage = () => {
  const navigate = useNavigate();
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

  const [sprintInfo, handleSprintInfoChange, setSprintInfo] =
    useInputState(null);

  //date state
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    setRefetchRequested((p) => !p);
    projectionRefetch((p) => !p);
  }, [admin, client]);

  useEffect(() => {
    sprint && setSprintInfo(sprint);
    setStartDate(new Date(sprintInfo?.start));
    setEndDate(new Date(sprintInfo?.end));
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
      updatedInfo: sprintInfo!,
    });
    if (status === 200) {
      console.log('updated');
    } else {
      console.log('error');
    }
  };

  //redirect to client login page
  if (!client) {
    navigate('/', { replace: true });
  }

  //wait until fetching both data
  if (!sprintInfo || !projections) {
    return <div>Loading</div>;
  }

  return (
    <>
      <FlexBetween>
        <Button onClick={() => navigate('/classroom', { replace: true })}>
          Go back to classroom
        </Button>
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

            <DatePicker
              selected={startDate}
              onChange={(date: Date) => {
                setStartDate(date);
                setSprintInfo({ ...sprintInfo, start: date.toDateString() });
              }}
            />
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => {
                setEndDate(date);
                setSprintInfo({ ...sprintInfo, end: date.toDateString() });
              }}
            />

            <FlexEnd>
              <Button onClick={onClickUpdate}>Update</Button>
            </FlexEnd>
          </Form>
        </Modal>
      </FlexBetween>
      <LineChart
        projections={projections}
        sprintOptions={sprintInfo.options}
        title={sprintInfo.title}
      />
    </>
  );
};

//styled
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
`;

const Input = styled.input`
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

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default SprintPage;
