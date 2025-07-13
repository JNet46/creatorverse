import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ShowCreators from './pages/ShowCreators';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ViewCreator from './pages/ViewCreator';

const App = () => {
  return (
    <BrowserRouter>
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
