import ReactLoader from 'react-loader-spinner';
import styled from 'styled-components';

export const Loader = () => {
  return (
    <Center>
      <ReactLoader
        type='Plane'
        color='#00BFFF'
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </Center>
  );
};

//styled
const Center = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
