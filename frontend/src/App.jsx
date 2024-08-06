import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./Components/Table";
import Add from "./Components/Add";
import { Toaster } from "react-hot-toast";
import Update from "./Components/Update";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Update />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
