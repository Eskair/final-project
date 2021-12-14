import React from 'react';
import styled from 'styled-components';

import { Navbar } from '../Navbar';

export const MainLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

//styled
const Wrapper = styled.div`
  margin: 20px;
`;
