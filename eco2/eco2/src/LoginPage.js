// src/LoginPage.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation
import Button from './components/ui/button'; // Adjust the import path as necessary
import Input from './components/ui/input'; // Import the Input component
import Label from './components/ui/label'; // Import the Label component
import Card, { CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from './components/ui/card'; // Import the Card components
import Alert, { AlertDescription } from './components/ui/alert'; // Import the Alert components

const LoginPage = () => {
  const history = useHistory(); // Initialize history for navigation
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !address || !age || !aadharNumber || !otp) {
      setError('Please fill in all fields');
      return;
    }

    // Here you would typically handle the form submission logic
    console.log('User Info:', { firstName, lastName, address, age, aadharNumber, otp });

    // Navigate to the next page for land coverage details
    history.push('/land-verification');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-blue-600 text-white">
          <CardTitle className="text-2xl font-bold">User Information</CardTitle>
          <CardDescription className="text-sm">Please fill in your details</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6">
            {error && (
              <Alert variant="error" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="mb-4">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="aadhar-number">Aadhar Number</Label>
              <Input
                id="aadhar-number"
                type="text"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="otp">OTP Verification</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col p-6">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md transition duration-200">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;