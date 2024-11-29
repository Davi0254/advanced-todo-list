import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div>403 Forbidden</div>
      <Link to="https://davi0254.github.io/advanced-todo-list">Login</Link>
    </div>
  );
}

export default ForbiddenPage;