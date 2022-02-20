import EditUser from './components/EditUser';
import Table from './components/Table';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/edit" element={<EditUser />} />
        <Route path="/" element={<Table />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
