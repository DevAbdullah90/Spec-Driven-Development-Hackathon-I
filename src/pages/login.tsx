import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { authClient } from '../lib/auth-client';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { siteConfig } = useDocusaurusContext();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "Login failed. Please check your credentials.");
      } else {
        // Save token to localStorage for cross-domain usage fallback
        if (data?.token) {
            localStorage.setItem('auth_token', data.token);
        } else if (data?.session?.token) { // handle potential structure variation
             localStorage.setItem('auth_token', data.session.token);
        }
        
        history.push(siteConfig.baseUrl);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Login" description="Login to your account">
      <div className="container margin-vert--lg" style={{ maxWidth: '400px' }}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="margin-bottom--md">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="button button--block button--outline button--secondary"
              style={{ textAlign: 'left', cursor: 'text' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="margin-bottom--md">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="button button--block button--outline button--secondary"
              style={{ textAlign: 'left', cursor: 'text' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div className="alert alert--danger margin-bottom--md">{error}</div>}
          
          <button 
            type="submit" 
            className={`button button--primary button--block ${loading ? 'button--disabled' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
      </div>
    </Layout>
  );
}