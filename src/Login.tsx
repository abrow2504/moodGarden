import { useState } from "react";
import { useAuth } from "./context/AuthContext";

const AuthGate = () => {
  const { user, login, signup, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user)
    return (
      <div>
        <p>Welcome, {user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
      <button onClick={() => login(email, password)}>Login</button>
      <button onClick={() => signup(email, password)}>Signup</button>
    </div>
  );
};

export default AuthGate;
