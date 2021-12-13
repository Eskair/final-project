import { Navigate } from 'react-router-dom';

//hooks
import { useAuth } from '../../hooks/useAuth';

//components
import { ClientLoginModal } from '../../components/ClientLoginModal';

const HomePage = () => {
  const { admin, client } = useAuth();

  //redirect users to register page
  if (!admin) {
    return <Navigate replace to='/register' />;
  }

  //redirect users to classroom page
  if (client) {
    return <Navigate replace to='/classroom' />;
  }

  return <ClientLoginModal />;
};

export default HomePage;
