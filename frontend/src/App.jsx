import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import LoginPage from './pages/LoginPage';
import SingupPage from './pages/SingupPage';
import OnbordingPage from './pages/OnbordingPage';
import NotificationsPage from './pages/NotificationsPage';
import ChatPage from './pages/ChatPage';
import CallPage from './pages/CallPage';
import { Toaster } from 'react-hot-toast';
import Pageloder from './component/Pageloder.jsx';
import useAuthUser from './hooks/useAuthUser.js';
import Nav__SideBar from './component/Nav__SideBar';
import { useTheamStore } from './stateStore/zustantTheamStore.js';

const App = () => {
  const { authData, isLoading } = useAuthUser();
  const isAuthenticated = Boolean(authData);
  const isOnbording = authData?.user?.isOnborded; // safe access
  const { theam } = useTheamStore();

  // Wait until auth loading is done before rendering routes
  if (isLoading) return <Pageloder />;

  return (
    <div data-theme={theam}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnbording
              ? <Nav__SideBar show={true}><Homepage /></Nav__SideBar>
              : <Navigate to={!isAuthenticated ? '/login' : '/onbording'} replace />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated
              ? <LoginPage />
              : <Navigate to={isOnbording ? '/' : '/onbording'} replace />
          }
        />
        <Route
          path="/singup"
          element={
            !isAuthenticated
              ? <SingupPage />
              : <Navigate to={isOnbording ? '/' : '/onbording'} replace />
          }
        />
        <Route
          path="/onbording"
          element={
            isAuthenticated
              ? (!isOnbording ? <OnbordingPage /> : <Navigate to="/" replace />)
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnbording
              ? <Nav__SideBar show={true}><NotificationsPage /></Nav__SideBar>
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnbording
              ? <Nav__SideBar show={false}><ChatPage /></Nav__SideBar>
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnbording
              ? <Nav__SideBar show={false}><CallPage /></Nav__SideBar>
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
