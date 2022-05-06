import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';
import { useCookies } from 'react-cookie';
import PageNotFound from './pages/PageNotFound';
import Main from './pages/Main';
import Patients from './pages/Patients';
import NewPatient from './pages/NewPatient';
import EditPatient from './pages/EditPatient';
import ConsultPatient from './pages/ConsultPatient';

function App() {
  const [cookies, setCookie] = useCookies(['login']);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      {!cookies.login ? 
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
        :
        <>
          <Route
            path="/"
            element={<Main />}
          />
          <Route
            path="/patients"
            element={<Patients />}
          />
          <Route
            path="/newpatient"
            element={<NewPatient />}
          />
          <Route
            path="/editpatient"
            element={<EditPatient />}
          />
          <Route
            path="/consultpatient"
            element={<ConsultPatient />}
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </>      
      }
    </Routes>
  );
}

export default App;
