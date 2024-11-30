import { HashRouter, Route, Routes } from "react-router-dom";
import Homepage from '../pages/home/homepage.jsx'

const App = () => {
  return (
    <HashRouter basename="/advanced-todo-list">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
