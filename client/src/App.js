import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/auth/Log";
import Register from "./pages/auth/Registration";
import{ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicsRoute from "./components/Routes/PublicsRoute";
import Donor from "./pages/Dashboard/Donor";
import Hospital from "./pages/Dashboard/Hospital";
import OrganisationPage from "./pages/Dashboard/OrganisationPage";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Dashboard/Donation";
import Analytics from "./pages/Dashboard/Analytics";


function App() {
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path="/donor" element={
         <ProtectedRoute>
          <Donor/>
          </ProtectedRoute>
          
        }
          />
          
        <Route path="/" element={
         <ProtectedRoute>
          <HomePage />
          </ProtectedRoute>
          
        }
          />
          <Route path="/consumer" element={
         <ProtectedRoute>
          <Consumer />
          </ProtectedRoute>
          
        }
          />
          <Route path="/donation" element={
         <ProtectedRoute>
          <Donation />
          </ProtectedRoute>
          
        }
          />
          <Route path="/analytics" element={
         <ProtectedRoute>
          <Analytics />
          </ProtectedRoute>
          
        }
          />
          <Route path="/hospital" element={
         <ProtectedRoute>
          <Hospital />
          </ProtectedRoute>
          
        }
          />
          <Route path="/organisation" element={
         <ProtectedRoute>
          <OrganisationPage />
          </ProtectedRoute>
          
        }
          />
          
        <Route path="/login" element={
          <PublicsRoute>
          <Login />
          </PublicsRoute>
          } />
        <Route path="/register" element={
          <PublicsRoute>
          <Register />
          </PublicsRoute>
          } />
      </Routes>
     
    </>
  );
}

export default App;
