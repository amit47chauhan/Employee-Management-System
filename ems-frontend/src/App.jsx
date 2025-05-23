import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import EmployeeList from "./components/EmployeeList";
import Footer from "./components/Footer";
import Header from "./components/Header";
function App() {
  return (
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<EmployeeList/>}/>
            <Route path="/employees" element={<EmployeeList/>}/>
          </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
