# Beehive Monitoring Frontend

This project is a frontend application built as part of **Team Reykjavik’s RIT iSchool Senior Project**. It visualizes beehive sensor data and provides tools for tracking hive health through observations and inspections.

I worked on the **frontend team**, collaborating with another developer and implementing designs provided by our team’s designer.

## Overview

The Beehive Monitoring system is designed to help users understand hive conditions through:

- Sensor data (temperature, humidity, CO₂, volume, weight)
- Observation logs (tagged notes over time)
- Inspection records (condition-based evaluations)
- Data visualizations and trends

To make this project fully demoable outside of the original backend environment, I implemented a **local mock API using JSON and localStorage**, allowing all features to function without a live server.

## Live Demo

👉 https://joshbcohn.com/projects/beehive

## Key Features

- Interactive dashboard with real-time-style summaries
- Graph-based data exploration with adjustable date ranges
- Add / delete observations and inspections
- Fully functional UI backed by local mock data
- Persistent state using localStorage

## Technical Highlights

- Built with **React + TypeScript**
- Component-based architecture for modular UI development
- Custom mock API layer (`fetchJson`) simulating REST endpoints
- Data normalization and timestamp handling for inconsistent formats
- State handled with React hooks and lightweight stores
- Designed to mirror real backend behavior for realistic interaction

## My Contributions

I focused on core user-facing flows and UI structure, including:

- Dashboard page (layout, data panels, and summary views)
- Observations page (list, filtering, add/delete functionality)
- Inspections page (UI and interaction patterns)
- Global layout components (header and footer)
- Integration of frontend with API layer and mock data system

I also implemented a **mock backend layer** so the application could run independently, including:

- Local API simulation using JSON + localStorage
- CRUD behavior for observations and inspections
- Handling of edge cases like sorting, timestamps, and missing data

## Team Context

- Worked on the frontend alongside another developer
- Followed designs provided by a dedicated team designer
- Collaborated to ensure consistency across dashboard, graphs, and data pages

## Why Mock Data?

The original backend is not publicly deployed. To ensure this project is still fully usable:

- API endpoints were recreated locally
- Data is persisted in localStorage
- The app behaves like a real full-stack system

This allows anyone to interact with the app as intended.

## What I Focus On

I care about building software that is:

- Clear and maintainable  
- Grounded in real-world use  
- Thoughtful in how it presents and communicates data  

## Future Improvements

- Reconnect to a live backend service
- Improve mobile responsiveness
- Expand analytics and alerting features
- Enhance authentication and user roles
# Beehive Monitoring Frontend

This project is a frontend application built as part of **Team Reykjavik’s RIT iSchool Senior Project**. It visualizes beehive sensor data and provides tools for tracking hive health through observations and inspections.

I worked on the **frontend team**, collaborating with another developer and implementing designs provided by our team’s designer.

## Overview

The Beehive Monitoring system is designed to help users understand hive conditions through:

- Sensor data (temperature, humidity, CO₂, volume, weight)
- Observation logs (tagged notes over time)
- Inspection records (condition-based evaluations)
- Data visualizations and trends

To make this project fully demoable outside of the original backend environment, I implemented a **local mock API using JSON and localStorage**, allowing all features to function without a live server.

## Live Demo

👉 https://joshbcohn.com/projects/beehive

## Key Features

- Interactive dashboard with real-time-style summaries
- Graph-based data exploration with adjustable date ranges
- Add / delete observations and inspections
- Fully functional UI backed by local mock data
- Persistent state using localStorage

## Technical Highlights

- Built with **React + TypeScript**
- Component-based architecture for modular UI development
- Custom mock API layer (`fetchJson`) simulating REST endpoints
- Data normalization and timestamp handling for inconsistent formats
- State handled with React hooks and lightweight stores
- Designed to mirror real backend behavior for realistic interaction

## My Contributions

I focused on core user-facing flows and UI structure, including:

- Dashboard page (layout, data panels, and summary views)
- Observations page (list, filtering, add/delete functionality)
- Inspections page (UI and interaction patterns)
- Global layout components (header and footer)
- Integration of frontend with API layer and mock data system

I also implemented a **mock backend layer** so the application could run independently, including:

- Local API simulation using JSON + localStorage
- CRUD behavior for observations and inspections
- Handling of edge cases like sorting, timestamps, and missing data

## Team Context

- Worked on the frontend alongside another developer
- Followed designs provided by a dedicated team designer
- Collaborated to ensure consistency across dashboard, graphs, and data pages

## Why Mock Data?

The original backend is not publicly deployed. To ensure this project is still fully usable:

- API endpoints were recreated locally
- Data is persisted in localStorage
- The app behaves like a real full-stack system

This allows anyone to interact with the app as intended.

## What I Focus On

I care about building software that is:

- Clear and maintainable  
- Grounded in real-world use  
- Thoughtful in how it presents and communicates data  

## Future Improvements

- Reconnect to a live backend service
- Improve mobile responsiveness
- Expand analytics and alerting features
- Enhance authentication and user roles

## Live Frontend with Test Data

https://joshbcohn.com/projects/beehive