# AgriScan Frontend

Welcome to the AgriScan Frontend! This part of the application provides a user-friendly interface for managing crop health, viewing drone data, and generating reports. The frontend is built with React and interacts with the backend service layers via RESTful API endpoints.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Overview
The AgriScan Frontend enables users to:
- View real-time data about their fields, crops, and drone statuses.
- Set up field scans and review historical data on crop health.
- Generate custom reports and access alerts based on crop conditions.
- Customize preferences, including alert thresholds.

## Features
- **Alerts Page**: Lists all active and historical alerts, with options to view details and recommended actions.
- **Reports Page**: Allows users to generate and view custom reports on crop health and field metrics.
- **Drone Management Page**: Displays drones and their current status, including maintenance records.
- **Field Management Page**: Allows users to add, edit, or remove fields, as well as view field-specific data.

## Project Structure
The main directories and files in this project are:
```plaintext
📂 src
 ┣ 📂 components          # Reusable UI components
 ┣ 📂 pages               # Main application pages (e.g., Dashboard, Alerts, Reports)
 ┣ 📂 services            # API service functions to interact with backend
 ┣ 📂 assets              # Images and static assets
 ┣ 📜 App.js              # Main App component
 ┣ 📜 index.js            # Entry point
 ┗ 📂 styles              # Global and component-specific styles

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/AgriScan.git
2. Navigate into the frontend folder:

3. cd AgriScan/frontend
4. Install dependencies:

5. npm install


This will guide users through cloning the repository, navigating to the frontend folder, and installing the necessary dependencies.




