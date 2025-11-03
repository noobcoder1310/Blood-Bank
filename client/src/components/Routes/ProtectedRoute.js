import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../redux/features/auth/authAction';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch(); // ✅ Correctly calling the hook

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(getCurrentUser()); // ✅ Just dispatch the thunk (it handles the API call)
      } catch (error) {
        localStorage.clear();
        console.log(error);
      }
    };

    if (localStorage.getItem('token')) {
      fetchUser();
    }
  }, [dispatch]);

  if (localStorage.getItem('token')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
