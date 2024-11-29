import RegisterRoute from "/src/Routes/registerRoute";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '/src/index.css';

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:3000/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        localStorage.setItem("jwt_token", data.token);
        localStorage.setItem("username", user);
        navigate("/home");
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.log(error)
      setMessage("Erro ao conectar com o servidor");
    }
  }
 
  return (
    <body className= 'body'>
      <form className= 'form' onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          className= 'placeholder'
          placeholder="Nome de usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          className= 'placeholder'
          type={showPassword ? "text" : "password"}
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className= 'senha'>
          <label className= 'input'>
            <input
              style={{ marginLeft : '7px' }} 
              type="checkbox"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            Mostrar senha
          </label>
        </p>
        <button type="submit" className= 'submitBtn'>
          ENTRAR
        </button>
        <p> Esqueceu nome de usuario/senha?</p>
        <div className= 'create'>
          <div className= 'formulario'>
            <p>Não possui uma conta?</p>
            <RegisterRoute />
          </div>
          <p>{message}</p>
        </div>
      </form>
    </body>
  );
}
