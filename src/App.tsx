import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import PruebaCaritas from './components/TestCaritas/PruebaCaritas';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from 'components/Layouts/MainLayout';
import RequireAuth from 'routes/requiredAuth';
import RouteWithLayout from 'routes';
import { Provider } from 'react-redux';
import store from 'stores';
import EnhancedTable from 'components/UserManagement';
import CreateExam from 'components/ExamManagement/components/CreateExam';
import AnswerTest from 'components/AnswerTest';
import ActiveExams from 'components/ExamManagement/components/ActiveExams';
import AllExams from 'components/ExamManagement/components/AllExams';
import Chart from 'components/ExamResults/components/Chart';


function App() {
  /* const authInfo = JSON.parse(sessionStorage.authInfo)
  console.log('authInfo')
  console.log(authInfo) */
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/pruebacaritas"
            element={
              <RequireAuth>
                <RouteWithLayout component={PruebaCaritas} layout={MainLayout} />
              </RequireAuth>}
          />
          <Route
            path="/allexams"
            element={
              <RequireAuth>
                <RouteWithLayout component={AllExams} layout={MainLayout} />
              </RequireAuth>}
          />
          <Route
            path="/activeexams"
            element={
              <RequireAuth>
                <RouteWithLayout component={ActiveExams} layout={MainLayout} />
              </RequireAuth>}
          />
          <Route
            path="/crearexamen"
            element={
              <RequireAuth>
                <RouteWithLayout component={CreateExam} layout={MainLayout} />
              </RequireAuth>}
          />
          <Route
            path="/userslist"
            element={
              /* authInfo.roles_name.includes('ADMINISTRADOR')
                ? */
                <RequireAuth>
                  <RouteWithLayout component={EnhancedTable} layout={MainLayout} />
                </RequireAuth>
                /* :
                <Navigate to={"/login"} /> */
            }
          />
          <Route
            path="/responderpruebas"
            element={
              <RequireAuth>
                <RouteWithLayout component={AnswerTest} layout={MainLayout} />
              </RequireAuth>}
          />
          <Route path="/login" element={<Login />} />
          <Route element={<Navigate to={"/login"} />} path="*" />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
