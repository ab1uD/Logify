# Logify

## Overview

**Logify** is a web application that allows users to report and view sightings of events or subjects of interest. It's a React-based platform designed for community engagement and information sharing.

## Key Features

- **User Authentication**: Includes login and registration functionality for secure access
- **Report Sightings**: Users can submit reports about sightings with relevant details
- **View Reports**: Browse all submitted sightings in a centralized location
- **User Testimonials**: Display user feedback and experiences
- **Responsive Design**: Utilizes Bootstrap and React-Bootstrap for a mobile-friendly interface
- **Community Pages**: Includes information sections (About Us, Contact Us) to build community trust

## Tech Stack

- **Frontend**: React 19 with React Router for navigation
- **Styling**: Bootstrap 5 and React-Bootstrap for responsive UI
- **Backend/Database**: JSON Server for managing sighting data and user information

## Purpose

Logify serves as a crowdsourced reporting platform where community members can document and share sightings, fostering transparency and collective awareness on topics of interest. It's designed to be user-friendly, secure, and accessible to a wide audience.

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

Start the React development server:
```bash
npm start
```

Start the JSON server (in a separate terminal):
```bash
npm run server
```

### Available Scripts

- `npm start` - Run the development server
- `npm build` - Build the production bundle
- `npm test` - Run tests
- `npm run server` - Start the JSON Server

## Project Structure

```
src/
├── components/
│   ├── AboutUs.jsx
│   ├── AllReports.jsx
│   ├── ContactUs.jsx
│   ├── Footer.jsx
│   ├── HeroSection.jsx
│   ├── Login.jsx
│   ├── NavBar.jsx
│   ├── Register.jsx
│   ├── ReportSighting.jsx
│   ├── SightingsSection.jsx
│   └── Testimonials.jsx
├── App.js
├── App.css
└── index.js
```