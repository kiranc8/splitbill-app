import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Group from "./Components/Group";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import ExpensePage from "./Components/ExpensePage";
import SettlementPage from "./Components/SettlementPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/group" element={<Group />} />
          <Route exact path="/bill" element={<ExpensePage />} />
          <Route exact path="/settle" element={<SettlementPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
