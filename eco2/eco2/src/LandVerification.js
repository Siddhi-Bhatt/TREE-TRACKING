// src/LandVerification.js

import React from 'react';
import Button from './components/ui/button'; // Adjust the import path as necessary
import Input from './components/ui/input'; // Import the Input component
import Label from './components/ui/label'; // Import the Label component
import Card, { CardHeader, CardContent, CardFooter, CardTitle } from './components/ui/card'; // Import the Card components

const LandVerification = () => {
  const handleImageUpload = (event) => {
    // Handle image upload logic here (e.g., using FormData)
    console.log(event.target.files);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-green-600 text-white">
          <CardTitle className="text-2xl font-bold">Land Verification</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4">
            <Label htmlFor="land-area">Land Area (in acres)</Label>
            <Input id="land-area" type="number" placeholder="Enter land area" required />
          </div>
          <div className="mb-4">
            <Label htmlFor="land-images">Upload Land Images</Label>
            <input 
              id="land-images" 
              type="file" 
              accept=".jpg,.jpeg,.png" 
              multiple 
              onChange={handleImageUpload} 
              required 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col p-6">
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md shadow-md transition duration-200">
            Verify Land
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LandVerification;