import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu, Tasks, Users, Posts } from "./components";

function App() {
  return (
    <BrowserRouter className="App">
      <Menu></Menu>
      <div className="margin">
        <Routes>
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/tasks" element={<Tasks />} />
          <Route exact path="/posts/:key" element={<Posts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
