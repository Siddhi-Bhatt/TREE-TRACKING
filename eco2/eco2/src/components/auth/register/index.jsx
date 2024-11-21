import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';

const Register = () => {
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
                navigate('/home');
            } catch (error) {
                setErrorMessage(error.message);
                setIsRegistering(false);
            }
        }
    };

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
                <div className="w-96 bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-gray-800 text-2xl font-semibold text-center mb-4">Create a New Account</h3>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Full Name</label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">Address</label>
                            <input
                                type="text"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">Age</label>
                            <input
                                type="number"
                                required
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">Phone Number</label>
                            <input
                                type="tel"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">Land Coverage</label>
                            <input
                                type="text"
                                required
                                value={landCoverage}
                                onChange={(e) => setLandCoverage(e.target.value)}
                                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); }}
                                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">Password</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); }}
                                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">Confirm Password</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); }}
                                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 transition duration-200'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>

                        <div className="text-sm text-center">
                            Already have an account? {' '}
                            <Link to={'/login'} className="text-indigo-600 hover:underline font-bold">Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Register;