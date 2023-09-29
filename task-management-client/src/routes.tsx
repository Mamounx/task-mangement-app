import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Tasks from './pages/task/Tasks';
import TaskNew from './pages/task/TaskNew';
import TaskEdit from './pages/task/TaskEdit';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/tasks" />, index: true },
        { path: 'tasks', element: <Tasks /> },
        { path: "tasks/new", element: <TaskNew /> },
        { path: "tasks/edit/:id", element: <TaskEdit /> },
      ],
    },
    {
      path: '/',
      children: [
        { element: <Navigate to="/dashboard/tasks" />, index: true },
      ],
    }
  ]);

  return routes;
}