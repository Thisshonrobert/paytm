
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Signin} from "./pages/Signin"
import {Signup} from "./pages/Signup"
import {Dashboard} from "./pages/Dashboard"
import {Sent} from "./pages/Sent"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/sent' element={<Sent/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
