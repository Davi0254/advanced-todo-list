import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div>403 Forbidden</div>
      <Link to="/">Login</Link>
    </div>
  );
}

export default ForbiddenPage;