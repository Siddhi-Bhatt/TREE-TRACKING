import React, { useRef, useState } from 'react';

const ContractSigning = () => {
  const [contractAccepted, setContractAccepted] = useState(false);
  const canvasRef = useRef(null);
  const [signatureData, setSignatureData] = useState(null);
  
  // Set up drawing variables
  const isDrawing = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const ctx = useRef(null);
  
  // Initialize canvas drawing context
  const initCanvas = () => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext('2d');
    ctx.current.lineWidth = 3;
    ctx.current.lineCap = 'round';
    ctx.current.strokeStyle = 'black';
  };

  // Start drawing on canvas
  const startDrawing = (e) => {
    isDrawing.current = true;
    const rect = canvasRef.current.getBoundingClientRect();
    lastX.current = e.clientX - rect.left;
    lastY.current = e.clientY - rect.top;
  };

  // Draw on canvas
  const draw = (e) => {
    if (!isDrawing.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.current.beginPath();
    ctx.current.moveTo(lastX.current, lastY.current);
    ctx.current.lineTo(x, y);
    ctx.current.stroke();

    lastX.current = x;
    lastY.current = y;
  };

  // End drawing
  const endDrawing = () => {
    isDrawing.current = false;
    setSignatureData(canvasRef.current.toDataURL());
  };

  // Clear the signature pad
  const clearSignature = () => {
    ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setSignatureData(null);
  };

  // Submit the contract
  const handleSignContract = () => {
    if (!signatureData) {
      alert('Please provide your signature.');
      return;
    }

    const contractData = {
      landownerId: 'LANDOWNER_ID', // Replace with actual ID
      signature: signatureData,
    };

    // Make API call to save the contract data
    fetch('/api/submit-contract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contractData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Contract signed successfully!');
        setContractAccepted(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was an error signing the contract.');
      });
  };

  // Initialize canvas when the component is mounted
  React.useEffect(() => {
    initCanvas();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Contract Signing</h2>

      {/* Contract Preview Section */}
      <div style={{
        border: '1px solid #ddd',
        padding: '15px',
        marginBottom: '20px',
        height: '300px',
        overflowY: 'scroll',
        backgroundColor: '#f9f9f9'
      }}>
        <h3 style={{ color: '#555' }}>Contract for Land Use</h3>
        <p style={{ color: '#666' }}>
          This agreement is made between the landowner and the company...
          <br />
          <br />
          (Contract text goes here...)
        </p>
      </div>

      {/* Signature Pad */}
      <div style={{
        border: '1px solid #ddd',
        padding: '20px',
        backgroundColor: '#fff'
      }}>
        <h4 style={{ color: '#333' }}>Please sign below to accept the contract:</h4>
        <canvas
          ref={canvasRef}
          width={600}
          height={150}
          style={{
            border: '1px solid #ddd',
            backgroundColor: '#fafafa'
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
        />
        <br />
        <button 
          onClick={clearSignature} 
          style={{
            marginRight: '10px',
            padding: '10px 15px',
            backgroundColor: '#e53e3e', // Red color for clear button
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor='#c53030'}
          onMouseOut={(e) => e.target.style.backgroundColor='#e53e3e'}
        >
          Clear
        </button>
        <button 
          onClick={handleSignContract} 
          style={{
            padding: '10px 15px',
            backgroundColor: '#38a169', // Green color for sign button
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor='#2f855a'}
          onMouseOut={(e) => e.target.style.backgroundColor='#38a169'}
        >
          Sign Contract
        </button>
      </div>

      {contractAccepted && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3 style={{ color:'#38a169' }}>Contract successfully signed!</h3>
        </div>
      )}
    </div>
  );
};

export default ContractSigning;