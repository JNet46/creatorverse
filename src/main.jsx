// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import ViewCreator from './pages/ViewCreator.jsx'
import EditCreator from './pages/EditCreator.jsx'
import AddCreator from './pages/AddCreator.jsx' // Import the new page

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add", // Add the route for the new page
    element: <AddCreator />,
  },
  {
    path: "/view/:id",
    element: <ViewCreator />,
  },
  {
    path: "/edit/:id",
    element: <EditCreator />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)