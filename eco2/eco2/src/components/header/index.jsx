import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';

const SignUp = () => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [landCoverage, setLandCoverage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/home'); // Navigate to home after successful registration
            } catch (error) {
                setErrorMessage(error.message);
                setIsRegistering(false);
            }
        }
    };

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(to right, #38a169, #4299e1)' // Green to Blue gradient
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '600px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    padding: '40px',
                    border: '1px solid #d1d5db' // Light gray border
                }}>
                    <h1 style={{
                        color: '#2d3748', // Dark gray color
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '24px'
                    }}>Create Your Account</h1>
                    <p style={{
                        color: '#718096', // Medium gray color
                        textAlign: 'center',
                        marginBottom: '16px'
                    }}>Join us today and start your journey!</p>
                    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <label style={{ fontSize: '0.875rem', color: '#4a5568', fontWeight: '600' }}>Full Name</label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                style={{
                                    width: '100%',
                                    marginTop: '8px',
                                    padding: '12px 16px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#48bb78'} // Green focus border
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'} // Reset border color
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: '0.875rem', color: '#4a5568', fontWeight: '600' }}>Address</label>
                            <input
                                type="text"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                style={{
                                    width: '100%',
                                    marginTop: '8px',
                                    padding: '12px 16px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#48bb78'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: '0.875rem', color: '#4a5568', fontWeight: '600' }}>Age</label>
                            <input
                                type="number"
                                required
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                style={{
                                    width: '100%',
                                    marginTop: '8px',
                                    padding: '12px 16px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#48bb78'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: '0.875rem', color: '#4a5568', fontWeight: '600' }}>Phone Number</label>
                            <input
                                type="tel"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                style={{
                                    width: '100%',
                                    marginTop: '8px',
                                    padding: '12px 16px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#48bb78'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: '0.875rem', color: '#4a5568', fontWeight: '600' }}>Land Coverage</label>
                            <input
                                type="text"
                                required
                                value={landCoverage}
                                onChange={(e) => setLandCoverage(e.target.value)}
                                style={{
                                    width: '100%',
                                    marginTop: '8px',
                                    padding: '12px 16px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease-in-out'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#48bb78'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: '0.875rem', color:'#4a5568', fontWeight:'600' }}>Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); }}
                                style={{
                                    width:'100%',
                                    marginTop:'8px',
                                    padding:'12px 16px',
                                    border:'1px solid #d1d5db',
                                    borderRadius:'8px',
                                    outline:'none',
                                    transition:'border-color 0.2s ease-in-out'
                                 }}
                                 onFocus={(e) => e.target.style.borderColor='#48bb78'}
                                 onBlur={(e) => e.target.style.borderColor='#d1d5db'}
                             />
                         </div>

                         <div>
                             <label style={{fontSize:'0.875rem', color:'#4a5568', fontWeight:'600'}}>Password</label>
                             <input 
                                 disabled={isRegistering}
                                 type="password"
                                 autoComplete='new-password'
                                 required 
                                 value={password} 
                                 onChange={(e) => {setPassword(e.target.value);}} 
                                 style={{
                                     width:'100%',
                                     marginTop:'8px', 
                                     padding:'12px 16px', 
                                     border:'1px solid #d1d5db', 
                                     borderRadius:'8px', 
                                     outline:'none', 
                                     transition:'border-color 0.2s ease-in-out'
                                 }} 
                                 onFocus={(e) => e.target.style.borderColor='#48bb78'} 
                                 onBlur={(e) => e.target.style.borderColor='#d1d5db'} 
                             />
                         </div>

                         <div>
                             <label style={{fontSize:'0.875rem', color:'#4a5568', fontWeight:'600'}}>Confirm Password</label>
                             <input 
                                 disabled={isRegistering} 
                                 type="password" 
                                 autoComplete='off' 
                                 required 
                                 value={confirmPassword} 
                                 onChange={(e) => {setConfirmPassword(e.target.value);}} 
                                 style={{
                                     width:'100%', 
                                     marginTop:'8px', 
                                     padding:'12px 16px', 
                                     border:'1px solid #d1d5db', 
                                     borderRadius:'8px', 
                                     outline:'none', 
                                     transition:'border-color 0.2s ease-in-out'
                                 }} 
                                 onFocus={(e) => e.target.style.borderColor='#48bb78'} 
                                 onBlur={(e) => e.target.style.borderColor='#d1d5db'} 
                             />
                         </div>

                         {errorMessage && (
                             <span className='text-red-600 font-bold'>{errorMessage}</span>
                         )}

                         <button 
                             type="submit" 
                             disabled={isRegistering} 
                             style={{
                                 width:'100%', 
                                 padding:'12px 16px', 
                                 backgroundColor:isRegistering ? '#cbd5e0' : '#38a169', // Light gray when disabled; green otherwise
                                 color:'#fff', 
                                 fontWeight:'500', 
                                 borderRadius:'8px', 
                                 cursor:isRegistering ? "not-allowed" : "pointer", // Change cursor based on state
                             }}>
                             {isRegistering ? "Signing Up..." : "Sign Up"}
                         </button>

                         <div style={{textAlign:"center",fontSize:"0.875rem"}}>
                             Already have an account? {' '}
                             <Link to={'/login'} style={{color:'#38a169', textDecoration:"underline", fontWeight:"bold"}}>Log In</Link>
                         </div>
                     </form>
                 </div>
             </main>
         </>
     );
};

export default SignUp;