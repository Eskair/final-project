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
      <StyledLink to='/'>{admin?.name || '${projectName}'}</StyledLink>
      <div>
        {admin ? (
          <NestedWrapper>
            <StyledLink to='/settings'>
              {admin?.name
                ? 'setting'
                : '👋 Click here and set your school name'}
            </StyledLink>
            <Button
              onClick={() => {
                signout!();
                navigate('/login', { replace: true });
              }}
            >
              Logout
            </Button>
          </NestedWrapper>
        ) : (
          <NestedWrapper>
            <StyledLink style={{ marginRight: '15px' }} to='/login'>
              Login
            </StyledLink>
            <StyledLink to='/register'>Register</StyledLink>
          </NestedWrapper>
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
  background-color: teal;
  color: white;
`;

const NestedWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  display: block;
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  color: white;
  border: none;
  background: none;
  margin-left: 10px;
  font-family: 'Permanent Marker', cursive;
  &:hover {
    cursor: pointer;
  }
`;
