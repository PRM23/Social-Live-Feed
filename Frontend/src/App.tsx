import "./App.css";
import { Suspense } from "react";
import { AppLoader } from "./components/app-loader";
import { AppNavigator } from "./components/app-navigator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Route }
    from "react-router-dom";
import Register from "./pages/auth/register/register";
import Login from "./pages/auth/login/login";
import { Navbar } from "./components/navbar";
import Home from "./pages/home/home";
import SavedPost from './components/SavedPost/SavedPost'

function App() {
  return (
    // <SavedPost/>
  //  <Home/>
    <Suspense fallback={<AppLoader />}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

       <AppNavigator />
     </Suspense>
  );
}

export default App;
