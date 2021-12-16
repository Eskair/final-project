import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';

//hooks
import { useAuth } from '../../hooks/useAuth';
import { useFetch, useInputState } from '../../hooks';

//components
import { Modal, MultiSelector, LineChart, Loader } from '../../components';

//api
import { updateSprint, deleteSprint } from '../../api/sprint';

const SprintPage = () => {
  const navigate = useNavigate();
  const { admin, client } = useAuth();
  const { sprintId } = useParams();

  const {
    loading,
    data: sprint,
    setRefetchRequested,
  } = useFetch(
    `/api/admins/${admin?.uid}/clients/${client}/sprints/${sprintId}`
  );

  const {
    loading: projectionLoading,
    data: projections,
    setRefetchRequested: projectionRefetch,
  } = useFetch(
    `/api/admins/${admin?.uid}/clients/${client}/sprints/${sprintId}/projections`
  );

  const [sprintInfo, handleSprintInfoChange, setSprintInfo] =
    useInputState(null);

  //date state
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    setRefetchRequested((p) => !p);
    projectionRefetch((p) => !p);
  }, [admin, client]); // eslint-disable-line

  useEffect(() => {
    if (!loading) {
      sprint && setSprintInfo(sprint);
    }
  }, [loading, sprint]); // eslint-disable-line

  useEffect(() => {
    if (sprintInfo) {
      setStartDate(new Date(sprintInfo.start));
      setEndDate(new Date(sprintInfo.end));
    }
  }, [sprintInfo]); // eslint-disable-line

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
      toast('Successfully Updated');
      setRefetchRequested((p) => !p);
    } else {
      toast('Oops, something went wrong 😈');
    }
  };

  //delete a sprint doc
  const onClickDelete = async (e: any) => {
    e.preventDefault();
    const { status } = await deleteSprint({
      uid: admin?.uid as string,
      clientId: client as string,
      sprintId,
    });

    if (status === 200) {
      return navigate('/classroom', { replace: true });
    } else {
      toast('Oops, something went wrong 😈');
    }
  };

  //wait until fetching both data
  if (!sprintInfo || projectionLoading) {
    return <Loader />;
  }

  return (
    <>
      <FlexBetween>
        <Button onClick={() => navigate('/classroom', { replace: true })}>
          Go back to classroom
        </Button>
        <div>
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
            <ToastContainer position='bottom-center' autoClose={3000} />
          </Modal>
          <Button style={{ marginLeft: '10px' }} onClick={onClickDelete}>
            Delete
          </Button>
        </div>
      </FlexBetween>
      <LineChart
        projections={projections}
        sprintOptions={sprint.options}
        title={sprint.title}
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
    border: 2px solid dodgerblue;
  }
`;

const Button = styled.button`
  border: none;
  padding: 5px 10px;
  margin: 10px 0;
  font-family: 'Permanent Marker', cursive;
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
