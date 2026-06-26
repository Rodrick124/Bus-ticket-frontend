import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import LogoWhite from '../assets/Logo-white.svg';
import promoImg from '../assets/Logo-white.svg';
import users from '../data/users.json';
import { useAuth } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const AuthPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const defaultTab = location.pathname.includes('register') ? 'register' : 'login';
  const [tab, setTab] = useState(defaultTab);

  // login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // register state
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      login(user);
      navigate('/dashboard/userdashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (regPassword !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    // For demo we just log and navigate home
    console.log('Registering with:', { regEmail, regPassword });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-white to-gray-100">
      <div className="w-full max-w-6xl mx-6 rounded-lg overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2">
        {/* Left promo panel */}
        <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white p-10 relative">
          <div className="flex items-center gap-3">
            <img src={darkMode ? LogoWhite : Logo} alt="logo" className="w-10 h-10" />
          </div>
          <h1 className="mt-8 text-4xl font-extrabold leading-tight">Connecting Cameroon, <span className="text-yellow-400">One Ticket</span> At A Time.</h1>
          <p className="mt-4 text-sm text-blue-100 max-w-sm">Join 50,000+ travelers booking secure, comfortable bus and rail trips across the nation.</p>

          <div className="mt-8 bg-blue-700/30 rounded-lg p-4 max-w-sm">
            <img src={promoImg} alt="bus" className="w-full rounded-md" />
            <div className="mt-3 text-sm text-blue-100">Trust Score 4.9/5</div>
          </div>

          <div className="absolute bottom-4 left-6 text-sm text-blue-200">© 2024 TransportHub</div>
        </div>

        {/* Right card with tabs */}
        <div className="bg-white p-8 md:p-12">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center gap-2 justify-center bg-gray-100 rounded-full p-1 mb-6">
              <button
                onClick={() => setTab('login')}
                className={`px-6 py-2 rounded-full ${tab === 'login' ? 'bg-white shadow' : 'bg-transparent text-gray-600'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('register')}
                className={`px-6 py-2 rounded-full ${tab === 'register' ? 'bg-white shadow' : 'bg-transparent text-gray-600'}`}
              >
                Create Account
              </button>
            </div>

            {tab === 'login' ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                <p className="mt-2 text-sm text-gray-500">Access your bookings and travel preferences.</p>
                <form onSubmit={handleLogin} className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Email Address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full mt-1 px-3 py-2 border rounded-md" placeholder="name@company.com" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full mt-1 px-3 py-2 border rounded-md" placeholder="••••••••" />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button type="submit" className="w-full mt-3 py-2 bg-blue-800 text-white rounded-md">Sign In to TransportHub</button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-500">Or continue with</div>
                <div className="mt-3 flex gap-3">
                  <button className="flex-1 p-2 border rounded-md">Google</button>
                  <button className="flex-1 p-2 border rounded-md">Facebook</button>
                </div>
                <p className="mt-6 text-sm text-center text-gray-500">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Create your Account</h2>
                <p className="mt-2 text-sm text-gray-500">Join thousands of travelers booking their journey with us.</p>
                <form onSubmit={handleRegister} className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Email Address</label>
                    <input value={regEmail} onChange={(e) => setRegEmail(e.target.value)} type="email" required className="w-full mt-1 px-3 py-2 border rounded-md" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Password</label>
                    <input value={regPassword} onChange={(e) => setRegPassword(e.target.value)} type="password" required minLength={8} className="w-full mt-1 px-3 py-2 border rounded-md" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Confirm Password</label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" required className="w-full mt-1 px-3 py-2 border rounded-md" placeholder="••••••••" />
                  </div>
                  <button type="submit" className="w-full mt-3 py-2 bg-blue-800 text-white rounded-md">Register</button>
                </form>
                <p className="mt-4 text-sm text-center">Already have an account? <button onClick={() => setTab('login')} className="text-blue-600">Sign in</button></p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
