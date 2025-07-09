import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import IntroducePage from "./pages/IntroducePage";
import TermsAgreement from "./pages/Signup/TermsAgreement";
import ExpertInputform from "./pages/Signup/ExpertInputform";






function App() {
  return (
    <div>
      <BrowserRouter>
      <Topbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/introduce" element={<IntroducePage />} />
        </Routes>
      <ExpertInputform/>
      {/* <TermsAgreement/> */}
    
      </BrowserRouter>
    
      
      
      
    </div>
  );
}

export default App;
