import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'Matheus' && password === '#Mathe0u') {
      onLogin();
    } else {
      alert('Usuário ou senha inválidos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input type="text" placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginForm;
