import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ShowCreators from './pages/ShowCreators';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ViewCreator from './pages/ViewCreator';
import { ToastContainer } from 'react-toastify'; // <-- IMPORT TOAST CONTAINER
import 'react-toastify/dist/ReactToastify.css';  // <-- IMPORT TOAST CSS

const App = () => {
  return (
    <BrowserRouter>
      {/* ADD THE TOAST CONTAINER HERE SO IT'S AVAILABLE GLOBALLY */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ShowCreators />} />
          <Route path="/new" element={<AddCreator />} />
          <Route path="/edit/:id" element={<EditCreator />} />
          <Route path="/:id" element={<ViewCreator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;