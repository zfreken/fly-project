import { Routes, Route } from "react-router-dom";
import { Home, List, Completed } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
      <Route path="/completed" element={<Completed />} />
    </Routes>
  );
}

export default App;
