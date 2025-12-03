import React, { useState } from 'react';

export default function AuthForm({ onSubmit, submitText = 'Submit' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handle = (e) => { e.preventDefault(); onSubmit({ name, email, password }); };

  return (
    <form onSubmit={handle} className="max-w-md mx-auto p-8 glass rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-white">{submitText}</h2>

      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name (optional)"
        className="w-full p-3 mb-3 rounded-md bg-transparent border border-white/6 placeholder:text-muted text-white" />

      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"
        className="w-full p-3 mb-3 rounded-md bg-transparent border border-white/6 placeholder:text-muted text-white" required />

      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"
        type="password" className="w-full p-3 mb-4 rounded-md bg-transparent border border-white/6 placeholder:text-muted text-white" required />

      <button className="btn-accent w-full">{submitText}</button>
    </form>
  );
}
