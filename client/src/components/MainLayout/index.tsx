import React from 'react';

import { Navbar } from '../Navbar';

export const MainLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
