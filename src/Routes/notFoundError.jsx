import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div>404 Not Found</div>
      <Link to="/https://davi0254.github.io/advanced-todo-list">Login</Link>
    </div>
  );
}

export default NotFoundPage;
