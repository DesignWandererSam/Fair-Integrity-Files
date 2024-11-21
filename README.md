# Fair-Integrity-Files

MCA Final Year Project - based on integrity verification of files and ensuring the authenticity of the files used in programs.

Overview:
This project provides a robust solution for file integrity verification and threat analysis. It was developed using Go for backend performance and TypeScript for an interactive front end. It ensures that critical files remain secure by detecting unauthorized modifications and analyzing potential threats.

Features
File Integrity Verification
- Uses cryptographic hash functions (SHA-256, SHA-512) to detect unauthorized changes.
- Supports both real-time and scheduled checks.
  
Threat Analysis
- Identifies threats based on integrity violations.
- Categorizes risks and provides actionable insights.
  
Web-Based Dashboard
- Built with TypeScript for an interactive user experience.
- View integrity reports, analyze threats, and scan results.

Technology Stack
Backend: Go (Golang) for efficient file integrity and threat analysis operations.
Frontend: TypeScript (React/Next.js and Flutter) for a dynamic user interface.
Database: SQLite for storing logs and configuration data.
API: RESTFul API for communication between the frontend and backend.

Use Cases
Enterprise Security: Ensure data integrity and meet regulatory compliance.
Software Verification: Validate distributed binaries and configuration files.
Incident Response: Quickly identify unauthorized changes for proactive security measures.
DevOps Monitoring: Keep configuration files and deployment scripts secure.

Installation - 
Prerequisites
Go 1.20+
Node.js 18+ and npm/yarn, Dart and Flutter (for the frontend)
Database (SQLite, for persistent storage)

Configuration
The config.yaml file (backend) and .env file (frontend) allow customization:

Backend (config.yaml)
Directories to Monitor
Hash Algorithms (SHA-256, SHA-512)
Alert Settings (email/webhook)

Frontend (.env)
RestFul API
Notification Preferences

Roadmap
 Add support for machine learning-based anomaly detection.
 Enhance the dashboard with real-time analytics and visualizations.
 Add support for real-time monitoring analysis.

 
