# TREE TRACKING

## Overview

This repository contains the code and resources for a **Tree Tracking System** designed to enable small landowners to participate in carbon credit programs. By streamlining sapling distribution, planting verification, growth monitoring, and carbon credit payouts, this system incentivizes sustainable forestry and environmental conservation.

The system leverages **YOLO v11** and **Roboflow** for advanced satellite imagery and drone-based verification. The frontend is built using **HTML, CSS, and JavaScript**, while the backend uses **Node.js**.

---

## Features

### 1. Registration & Eligibility Verification
- **Landowner**: Registers their interest and uploads necessary documents via the system.
- **System**: Verifies eligibility by cross-referencing uploaded documents with databases.

### 2. Contract Signing
- **Landowner**: Reviews and digitally signs the contract.
- **System**: Countersigns, stores the contract, and shares it with the landowner.

### 3. Sapling Distribution
- **Landowner**: Collects allocated saplings and confirms receipt digitally through the mobile app.
- **System**: Logs the distribution against the landowner's profile and aggregates all enrolled lands.

### 4. Planting & Initial Verification
- **Landowner**: Plants the saplings following provided guidelines and reports the planting activity.
- **System**: Verifies planting accuracy using satellite imagery or drone footage.

### 5. Growth Monitoring & Carbon Captured
- **Landowner**: Provides regular updates on sapling growth and health.
- **System**: Utilizes remote sensing data and AI for monitoring growth, estimating carbon capture, and confirming progress.

### 6. Carbon Credits & Payments
- **System**: Calculates and processes carbon credit payments based on verified data.
- **Landowner**: Receives payment and can view transaction details via the system.

---

## Technologies Used

### Frontend
- **HTML, CSS, JavaScript**
  - Implements a responsive and user-friendly interface for landowners to interact with the system.

### Backend
- **Node.js**
  - Handles API requests, data processing, and communication between the frontend and machine learning components.

### Machine Learning
- **YOLO v11** and **Roboflow**
  - Used for advanced image recognition tasks including:
    - Verifying sapling planting.
    - Monitoring growth over time using satellite and drone data.
