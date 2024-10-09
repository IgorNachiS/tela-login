import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]); // Estado para armazenar os usuários
  const [isRegistered, setIsRegistered] = useState(true); // Estado para alternar entre login e registro
  const [error, setError] = useState(""); // Estado para armazenar mensagens de erro
  const [successMessage, setSuccessMessage] = useState(""); // Estado para armazenar mensagens de sucesso

  // Função chamada quando o formulário é enviado
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const existingUser = users.find(user => user.username === username);
    
    if (existingUser) {
      if (existingUser.password === password) {
        console.log(`Bem-vindo, ${username}!`);
        setSuccessMessage(`Bem-vindo, ${username}!`);
        setError(""); // Limpa mensagens de erro
      } else {
        setError("Senha incorreta");
        console.log("Senha incorreta");
        setSuccessMessage(""); // Limpa mensagem de sucesso
      }
    } else {
      setError("Usuário não cadastrado");
      console.log("Usuário não cadastrado");
      setSuccessMessage(""); // Limpa mensagem de sucesso
    }
  };

  // Função para registrar um novo usuário
  const handleRegister = (event) => {
    event.preventDefault();
    
    const existingUser = users.find(user => user.username === username);
    
    if (!existingUser) {
      setUsers([...users, { username, password }]);
      console.log(`Usuário ${username} cadastrado com sucesso!`);
      setSuccessMessage(`Usuário ${username} cadastrado com sucesso!`);
      setIsRegistered(true); // Retorna para a tela de login
      setError(""); // Limpa mensagens de erro
      setUsername(""); // Limpa o campo de entrada
      setPassword(""); // Limpa o campo de entrada
    } else {
      setError("Usuário já cadastrado");
      console.log("Usuário já cadastrado");
      setSuccessMessage(""); // Limpa mensagem de sucesso
    }
  };

  return (
    <div className="container">
      <form onSubmit={isRegistered ? handleSubmit : handleRegister}>
        <h1>{isRegistered ? "Acesse o sistema" : "Registre-se"}</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="E-mail"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#">Esqueceu sua senha?</a>
        </div>
        <button type="submit">{isRegistered ? "Login" : "Registrar"}</button>
        <div className="signup-link">
          <p>
            {isRegistered ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
            <a href="#" onClick={() => setIsRegistered(!isRegistered)}>
              {isRegistered ? "Registrar" : "Login"}
            </a>
          </p>
        </div>

        {/* Exibe mensagens de erro e sucesso abaixo do link de registro/login */}
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Login;