import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginScreen from '../screens/login'
import HomeScreen from '../screens/home'
import DeliveryBagScreen from '../screens/childrens/deliverybag'
import PrepBagScreen from '../screens/childrens/prepbag'
import InPrepScreen from '../screens/childrens/inprep'
import SettingsScreen from '../screens/childrens/settings'
import { ProtectedRoute, PublicOnlyRoute } from './guards'

export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: '/',
        element: <LoginScreen />,
      },
      {
        path: '/login',
        element: <LoginScreen />,
      },
      {
        // A recuperação de senha é feita pelo link da tela de login do Keycloak.
        path: '/forgot',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/home',
        element: <HomeScreen />,
      },
      {
        path: '/deliverybag',
        element: <DeliveryBagScreen />,
      },
      {
        path: '/prepbag',
        element: <PrepBagScreen />,
      },
      {
        path: '/inprep',
        element: <InPrepScreen />,
      },
      {
        path: '/settings',
        element: <SettingsScreen />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
])
