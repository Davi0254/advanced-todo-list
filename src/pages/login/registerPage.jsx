import { useState } from "react";
import LoginRoute2 from "/src/Routes/loginRoute2";
import '/src/index.css';

export default function Form() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch("https://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message); 

        // if (data.redirectTo) {
        //   useNavigate(data.redirectTo)
        // }
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao registrar usuario' })
    }
  };

  return (
    <div className= 'body'>
      
      <form className= 'form' onSubmit={handleSubmit}>
        <div>
        <h1>Criar conta</h1>
        
        </div>

        <input
          className= 'placeholder'
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className= 'placeholder'
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          className= 'placeholder'
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className= 'senha'>
          <label className= 'input'>
            <input 
             
              type="checkbox" 
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            Mostrar senha
          </label>
        </p>
        <button type="submit" className= 'submitBtn'>
          CRIAR CONTA
        </button>{" "}
        <LoginRoute2 />
        <p>{message}</p>
      </form>
    </div>
  );
}
