
---

### README for Service Layers and Database

```markdown
# AgriScan Backend Service and Database

This README provides an overview of the backend service layers and database design for the AgriScan project. The backend is responsible for handling all business logic, data persistence, and interactions with the frontend application.

## Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Database Design](#database-design)
- [Service Layers](#service-layers)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Installation](#installation)
- [Running the Service](#running-the-service)

## Overview
The backend for AgriScan uses a service layer to interact with MongoDB, providing a RESTful API for crop monitoring, alerts, and report generation. This separation ensures that the database structure and business logic remain decoupled from the frontend.

## Technology Stack
- **Node.js** and **Express** for server and API handling
- **MongoDB** for document-oriented database management
- **Mongoose** as the MongoDB object modeling tool

## Database Design
The database is organized in MongoDB collections tailored to support AgriScan’s features. Key collections include:
- **Fields**: Stores information about user fields, including crop types and location data.
- **Field Scans**: Holds scan data on crop health and conditions for each field.
- **Alerts**: Logs crop health alerts, including severity levels and recommendations.
- **Reports**: Stores generated reports for historical data analysis.
- **Drones**: Tracks drone statuses and maintenance logs.

Example **Fields** Document:
```json
{
  "_id": "field123",
  "fieldName": "North Field",
  "location": { "latitude": 38.1234, "longitude": -91.5678 },
  "boundaryCoordinates": [
    { "lat": 38.124, "lng": -91.568 },
    { "lat": 38.122, "lng": -91.566 }
  ],
  "cropType": "corn",
  "userId": "user123"
}


Service Layers
The backend services act as intermediaries between the frontend and database, handling:

-Field Management: Creating, updating, and deleting fields.
-Scan Data Management: Saving scan results and retrieving scan histories.
-Alert Management: Creating, viewing, and resolving alerts.
-Report Generation: Generating and retrieving custom reports.
-Drone Management: Tracking drone statuses and maintenance logs.
