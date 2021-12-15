import { Navigate } from 'react-router-dom';

//hooks
import { useAuth } from '../../hooks/useAuth';

//components
import { ClientLoginModal } from '../../components/ClientLoginModal';

const HomePage = () => {
  const { admin, client } = useAuth();

  if (!admin) {
    return <Navigate to='/register' />;
  }

  if (client) {
    return <Navigate to='/classroom' />;
  }

  return <ClientLoginModal />;
};

export default HomePage;
