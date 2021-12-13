import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

//hooks
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const {
    admin,
    actions: { signout },
  } = useAuth();
  return (
    <Wrapper>
      <StyledLink to='/'>Coding Beauty 😈</StyledLink>
      <div>
        {admin ? (
          <Button onClick={() => signout && signout()}>SignOut</Button>
        ) : (
          <StyledLink to='/register'>Register</StyledLink>
        )}
      </div>
    </Wrapper>
  );
};

//styled
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
  }
`;
