import React from 'react';
import { lazy, Suspense, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Spinner from './components/spinner/Spinner';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';


// Lazy-loaded components
const HomeLayout = lazy(() => import('./pages/homeLayout/HomeLayout'));
const Login = lazy(() => import('./pages/login/Login'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const MyTeam = lazy(() => import('./pages/myTeam/MyTeam'));
const MyTask = lazy(() => import('./pages/myTask/MyTask'));
const Billing = lazy(() => import('./pages/billing/Billing'));
const Setting = lazy(() => import('./pages/settings/Settings'));

function App() {

  const router = createBrowserRouter([
    {
      path: '/login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: '/',
      element: (
        <PrivateRoute>
          <HomeLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path: '/',
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'myTeam',
          element: <MyTeam />
        },
        {
          path: 'myTask',
          element: <MyTask />
        },
        {
          path: 'billing',
          element: <Billing />
        },
        {
          path: 'setting',
          element: <Setting />
        },
        {
          path: '*',
          element: <Navigate to="dashboard" />
        },
      ],
    },
  ]);


  return (
    <Suspense fallback={<Spinner size={'20vw'} />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
