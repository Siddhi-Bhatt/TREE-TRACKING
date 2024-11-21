import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';

const Login = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSigningIn(true); // Set signing in state
        const result = await doSignInWithEmailAndPassword(email, password);
        setIsSigningIn(false); // Reset signing in state

        if (result.error) {
            setErrorMessage(result.error);
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
            } catch (err) {
                setIsSigningIn(false);
                setErrorMessage('Failed to sign in with Google.'); // Set error message
            }
        }
    };

    return (
        <div>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9fafb' // Light gray background
            }}>
                <div style={{
                    width: '400px',
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#4a5568' }}>Welcome Back</h3>
                        <p style={{ fontSize: '0.875rem', color: '#718096' }}>Please log in to continue</p>
                    </div>

                    <form onSubmit={onSubmit} style={{ marginTop: '20px' }}>
                        <div>
                            <label style={{ fontSize: '0.875rem', color: '#4a5568', fontWeight: '500' }}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    marginTop: '8px',
                                    padding: '10px 12px',
                                    borderRadius: '4px',
                                    border: '1px solid #d1d5db',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out'
                                }}
                                placeholder="Enter your email"
                                onFocus={(e) => e.target.style.borderColor = '#4c51bf'} // Indigo focus border
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'} // Reset border color
                            />
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            <label style={{ fontSize: '0.875rem', color: '#4a5568', fontWeight: '500' }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    marginTop: '8px',
                                    padding: '10px 12px',
                                    borderRadius: '4px',
                                    border: '1px solid #d1d5db',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out'
                                }}
                                placeholder="Enter your password"
                                onFocus={(e) => e.target.style.borderColor = '#4c51bf'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                        </div>

                        {errorMessage && (
                            <div style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '8px' }}>{errorMessage}</div>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: isSigningIn ? '#cbd5e0' : '#4c51bf', // Light gray when disabled; indigo otherwise
                                color: '#fff',
                                fontWeight: '600',
                                borderRadius: '4px',
                                marginTop: '16px',
                                cursor: isSigningIn ? "not-allowed" : "pointer",
                            }}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '20px'
                    }}>
                        <div style={{ flexGrow: 1, height: '1px', backgroundColor:'#d1d5db' }}></div>
                        <span style={{ fontSize:'0.875rem', color:'#4a5568', margin:'0 10px' }}>OR</span>
                        <div style={{ flexGrow: 1, height:'1px', backgroundColor:'#d1d5db' }}></div>
                    </div>

                    <button
                        onClick={onGoogleSignIn}
                        disabled={isSigningIn}
                        style={{
                            width:'100%',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            gap:'10px',
                            padding:'12px',
                            borderRadius:'4px',
                            border:'1px solid #d1d5db',
                            color:'#4a5568',
                            cursor:isSigningIn ? "not-allowed" : "pointer",
                            transition:'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor='#f7fafc'}
                        onMouseOut={(e) => e.target.style.backgroundColor='transparent'}
                    >
                        {/* Google Icon - Size Reduced */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" width="20" height="20">
                            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                            <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20 -0 -28 -28 -28 -28 -28 -28 -28 -28 -28 -28 -28"></path>
                        </svg>
                        {isSigningIn ? "Signing In..." : "Continue with Google"}
                    </button>

                    <p style={{ textAlign:'center', fontSize:'0..875rem', marginTop:'16px' }}>
                      Don't have an account? 
                      <Link to={'/register'} 
                          style={{ color:'#4c51bf', textDecoration:'underline', fontWeight:'600' }}>
                          Sign up
                      </Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Login;