import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import fetchGeoData from './loaders/fetchGeoData';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: fetchGeoData,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
