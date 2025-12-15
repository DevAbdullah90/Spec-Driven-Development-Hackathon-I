import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { authClient } from '../lib/auth-client';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(''); // Base64 image string
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { siteConfig } = useDocusaurusContext();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500000) { // 500KB limit
        setError("Image size too large. Please choose an image under 500KB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image, // Pass the base64 image
      });

      if (error) {
        setError(error.message || "Registration failed. Please try again.");
      } else {
        // Redirect to home
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
    <Layout title="Register" description="Create an account">
      <div className="container margin-vert--lg" style={{ maxWidth: '400px' }}>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <div className="margin-bottom--md">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="button button--block button--outline button--secondary"
              style={{ textAlign: 'left', cursor: 'text' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              minLength={8}
            />
          </div>

          <div className="margin-bottom--md">
            <label htmlFor="image">Profile Picture (Optional)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
              )}
              <input
                id="image"
                type="file"
                accept="image/*"
                className="button button--block button--outline button--secondary"
                style={{ textAlign: 'left', cursor: 'pointer', padding: '10px' }}
                onChange={handleImageChange}
              />
            </div>
          </div>

          {error && <div className="alert alert--danger margin-bottom--md">{error}</div>}

          <button
            type="submit"
            className={`button button--primary button--block ${loading ? 'button--disabled' : ''}`}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </Layout>
  );
}