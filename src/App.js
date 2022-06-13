import { Home, Favorites, Login, ProductsDetail } from './pages';
import './styles/loading-screen.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { LoadingScreen, NavBar, ProtectedRoutes } from './components';
import { useSelector } from 'react-redux';

function App() {

  const isLoading = useSelector(state => state.isLoading);
  return (
    <HashRouter>
      <NavBar />
      <Container>
        { isLoading && <LoadingScreen /> }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductsDetail />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/favorites" element={<Favorites />} />
          </Route>

        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
