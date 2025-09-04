import { BrowserRouter, useLocation } from 'react-router-dom';
import { AllRoutes } from './index';
import ActionButton from '../helpers/ActionButton/ActionButton';
import { useEffect, useState } from 'react';
import { getUserFromSession } from '../helpers/api/apiCore';

const Routes = () => {

    
const ActionButtonWrapper = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Keep checking for user in sessionStorage every 500ms until it's found
  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = getUserFromSession();
      if (storedUser) {
        setUser(storedUser);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const currentPageName = location.pathname
    .split('/')
    .filter(Boolean)
    .pop()
    ?.toLowerCase();

  if (!user || currentPageName === 'login') return null;

  return <ActionButton />;
};
    return (
        <BrowserRouter>
            <AllRoutes />
            <ActionButtonWrapper/>
        </BrowserRouter>
    );
};

export default Routes;
