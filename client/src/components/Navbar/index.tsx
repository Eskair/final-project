import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';

//hooks
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const {
    admin,
    actions: { signout },
  } = useAuth();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <StyledLink to='/classroom'>Coding Beauty 😈</StyledLink>
      <div>
        {admin ? (
          <NestedWrapper>
            <StyledLink to='/settings'>
              👋 {admin.name || 'Click here and set your school name'}
            </StyledLink>
            <Button
              onClick={() => {
                signout!();
                navigate('/register', { replace: true });
              }}
            >
              SignOut
            </Button>
          </NestedWrapper>
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
  padding: 15px 10px;
  border-bottom: 1px solid black;
`;

const NestedWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  display: block;
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  border: none;
  background: none;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;
