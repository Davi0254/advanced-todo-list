import { Link } from "react-router-dom";

 const loginRoute = () => {
    return (
      <nav style={{ marginTop: '10px', marginBottom: '-20px', marginLeft: '10px' }}>
        <Link to="/advanced-todo-list">login</Link>
      </nav>
    )
}

export default loginRoute;