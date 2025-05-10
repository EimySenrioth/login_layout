import { useState } from 'react';
import './index.css';

// Componente principal que simula el layout de autenticación
export default function AuthSystem() {
  const [view, setView] = useState('login');
  
  // Cambiar entre vistas: login, register, forgot-password
  const changeView = (newView) => {
    setView(newView);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-800 to-teal-600">
      {/* Header */}
      <header className="py-4 bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <div className="py-4">
            <div className="bg-white inline-block px-6 py-2 rounded shadow-md">
              <div className="flex items-center">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="h-10"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto">
            {view === 'login' && <LoginCard onViewChange={changeView} />}
            {view === 'register' && <RegisterCard onViewChange={changeView} />}
            {view === 'forgot-password' && <ForgotPasswordCard onViewChange={changeView} />}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 bg-white bg-opacity-10 backdrop-blur-sm text-center text-white">
        <div className="container mx-auto">
          <small>© {new Date().getFullYear()} Sistema Escolar. Todos los derechos reservados.</small>
        </div>
      </footer>
    </div>
  );
}

// Componente de Login
function LoginCard({ onViewChange }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login con: ${email}, ${password}, Recordar: ${rememberMe}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Card Header */}
      <div className="bg-teal-600 text-white text-center py-4">
        <h4 className="text-xl font-bold">Iniciar Sesión</h4>
      </div>
      
      {/* Card Body */}
      <div className="p-6">
        <div className="text-center text-slate-700 mb-4">
          <small>Ingresa con tus credenciales</small>
        </div>
        
        <div className="space-y-4">
          <div className="mb-4">
            <div className="flex items-center border border-gray-200 rounded shadow-sm">
              <div className="px-3 py-2 border-r border-gray-200 bg-white">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                className="appearance-none bg-white border-0 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center border border-gray-200 rounded shadow-sm">
              <div className="px-3 py-2 border-r border-gray-200 bg-white">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                className="appearance-none bg-white border-0 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none"
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-4 flex items-center">
            <input
              className="mr-2"
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember-me" className="text-gray-600 text-sm">
              <span>Recordarme</span>
            </label>
          </div>
          
          <div className="text-center">
            <button
              className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded w-full mb-4"
              onClick={handleSubmit}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between">
          <button 
            className="text-blue-500 text-sm"
            onClick={() => onViewChange('forgot-password')}
          >
            ¿Olvidaste tu contraseña?
          </button>
          <button
            className="text-orange-500 text-sm"
            onClick={() => onViewChange('register')}
          >
            Crear cuenta nueva
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente de Registro
function RegisterCard({ onViewChange }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  
  const checkPasswordStrength = (value) => {
    setPassword(value);
    
    if (!value) {
      setPasswordStrength('');
      return;
    }
    
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLongEnough = value.length >= 8;
    
    const strength = 
      (hasUpperCase ? 1 : 0) +
      (hasLowerCase ? 1 : 0) +
      (hasNumbers ? 1 : 0) +
      (hasSpecialChars ? 1 : 0) +
      (isLongEnough ? 1 : 0);
    
    if (strength < 2) return setPasswordStrength('weak');
    if (strength < 4) return setPasswordStrength('medium');
    return setPasswordStrength('strong');
  };
  
  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'strong': return 'text-green-500';
      default: return '';
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registro con: ${name}, ${email}, ${password}, Términos: ${agreeToTerms}`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Card Header */}
      <div className="bg-teal-600 text-white text-center py-4">
        <h4 className="text-xl font-bold">Crear Cuenta</h4>
      </div>
      
      {/* Card Body */}
      <div className="p-6">
        <div className="text-center text-slate-700 mb-4">
          <small>Regístrate con</small>
        </div>
        
        {/* Social Login Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="flex items-center justify-center bg-white border border-gray-200 rounded py-2 px-4 hover:shadow-md transition-all">
            <span className="mr-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </span>
            <span>Github</span>
          </button>
          <button className="flex items-center justify-center bg-white border border-gray-200 rounded py-2 px-4 hover:shadow-md transition-all">
            <span className="mr-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
            </span>
            <span>Google</span>
          </button>
        </div>
        
        <div className="text-center text-gray-600 mb-4">
          <small>O regístrate con credenciales</small>
        </div>
        
        <div className="space-y-4">
          <div className="mb-4">
            <div className="flex items-center border border-gray-200 rounded shadow-sm">
              <div className="px-3 py-2 border-r border-gray-200 bg-white">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                className="appearance-none bg-white border-0 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none"
                placeholder="Nombre"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center border border-gray-200 rounded shadow-sm">
              <div className="px-3 py-2 border-r border-gray-200 bg-white">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                className="appearance-none bg-white border-0 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-1">
            <div className="flex items-center border border-gray-200 rounded shadow-sm">
              <div className="px-3 py-2 border-r border-gray-200 bg-white">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                className="appearance-none bg-white border-0 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none"
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => checkPasswordStrength(e.target.value)}
              />
            </div>
          </div>
          
          {passwordStrength && (
            <div className="mb-4">
              <small className={getPasswordStrengthColor()}>
                Fortaleza de contraseña: {passwordStrength}
              </small>
            </div>
          )}
          
          <div className="mb-4 flex items-center">
            <input
              className="mr-2"
              id="agree"
              type="checkbox"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
            />
            <label htmlFor="agree" className="text-gray-600 text-sm">
              <span>Acepto la </span>
              <a href="#" className="text-teal-600">Política de Privacidad</a>
            </label>
          </div>
          
          <div className="text-center">
            <button
              className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded w-full mb-4"
              onClick={handleSubmit}
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="bg-gray-100 p-4">
        <div className="text-center">
          <span className="text-gray-700 text-sm">¿Ya tienes una cuenta?</span>{' '}
          <button
            className="text-orange-500 text-sm"
            onClick={() => onViewChange('login')}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente de Recuperación de Contraseña
function ForgotPasswordCard({ onViewChange }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de éxito
    setAlertType('success');
    setAlertMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
    setSubmitted(true);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Card Header */}
      <div className="bg-teal-600 text-white text-center py-4">
        <h4 className="text-xl font-bold">Recuperar Contraseña</h4>
      </div>
      
      {/* Card Body */}
      <div className="p-6">
        {alertMessage && (
          <div className={`mb-4 p-3 rounded ${alertType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {alertMessage}
          </div>
        )}
        
        <div className="text-center text-slate-700 mb-4">
          <small>Ingresa tu correo electrónico para recibir instrucciones de recuperación</small>
        </div>
        
        <div className="space-y-4">
          <div className="mb-4">
            <div className="flex items-center border border-gray-200 rounded shadow-sm">
              <div className="px-3 py-2 border-r border-gray-200 bg-white">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                className="appearance-none bg-white border-0 py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitted}
              />
            </div>
          </div>
          
          <div className="text-center">
            <button
              className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded w-full mb-4"
              onClick={handleSubmit}
              disabled={submitted}
            >
              {submitted ? 'Enviado' : 'Enviar Enlace de Recuperación'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className="bg-gray-100 p-4">
        <div className="text-center">
          <button
            className="text-orange-500 text-sm"
            onClick={() => onViewChange('login')}
          >
            Volver a Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}