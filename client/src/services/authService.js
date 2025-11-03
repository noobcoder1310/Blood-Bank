import { userLogin, userRegister } from '../redux/features/auth/authAction';
import store from '../redux/store';
import { toast } from 'react-toastify';

export const handleLogin = (
  e,
  email,
  password,
  role,
  dispatch = store.dispatch,
  navigate = () => {}
) => {
  e.preventDefault();
  try {
    if (!role || !password || !email) {
      toast.error('Please provide all fields');
      return;
    }
    dispatch(userLogin({ email, password, role })).then((action) => {
      if (userLogin.fulfilled.match(action)) {
        toast.success('Login successful');
        const { existingUser, token } = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload.existingUser));
localStorage.setItem("token", action.payload.token);
if (navigate) {
          if (existingUser.role === 'donor') {
            navigate('/organisation');
          } else if (existingUser.role === 'admin') {
            navigate('/admin');
          } else if (existingUser.role === 'hospital') {
            navigate('/organisation');}
           else if (existingUser.role === 'organisation') {
            navigate('/hospital');
          } else {
            navigate('/');
          }
        }
        
      } else {
        toast.error(action.payload?.message || 'Login failed');
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    toast.error('Login error');
  }
};

export const handleRegister = (
  e,
  name,
  role,
  password,
  email,
  organisationName,
  address,
  HospitalName,
  website,
  phone
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        name,
        role,
        password,
        email,
        organisationName,
        address,
        HospitalName,
        website,
        phone,
      })
    );
  } catch (error) {
    console.error('Register error:', error);
  }
};