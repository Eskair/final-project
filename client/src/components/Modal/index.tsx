import { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

export const Modal = ({ children }: any) => {
  //modal
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '350px',
      height: '350px',
    },
  };

  return (
    <>
      <Button onClick={openModal}>Settings</Button>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel='Modal'
        style={customStyles}
        ariaHideApp={false}
      >
        <Flex>
          <div>Settings</div>
          <Button onClick={closeModal}>close</Button>
        </Flex>
        {children}
      </ReactModal>
    </>
  );
};

//styled
const Button = styled.button`
  border: none;
  padding: 5px 10px;
  margin: 10px 0;
  &:hover {
    cursor: pointer;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
