import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [_, setCookies] = useCookies('access_token');
  const navigate = useNavigate();

  const messageBg = isSuccess ? { backgroundColor: 'lightgreen' } : { backgroundColor: 'lightcoral' };

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', loginInfo);
      if (response.status === 200) {
        setIsSuccess(true);
        setMessage(response.data.message);
        setCookies('access_token', response.data.token);

        setInterval(() => navigate('/'), 3000);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form method='POST' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' id='email' value={loginInfo.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            id='password'
            value={loginInfo.password}
            onChange={handleChange}
            required
          />
        </div>
        {message && <p style={messageBg}>{message}</p>}
        <button type='submit' disabled={isSuccess}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
