# 📚 Bookstore Inventory API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

## 📋 Description

**Bookstore Inventory API** is a backend solution designed to manage bookstore inventory operations with efficiency and scalability in mind. Built with modern technologies and frameworks.

---

## 🚀 Quick Start Guide

### **1️⃣ Clone the Repository**
```bash
$ git clone https://github.com/luiselianmg/bookstore-inventory-api.git
$ cd bookstore-inventory-api
```

## 2️⃣ Environment Configuration
Copy the environment template file and configure your credentials:
```bash
$ cp .env.example .env
```

📝 **Note:** The .env.example file already contains dummy credentials that you can use for testing. However, you must create the .env file as the application will not run correctly without it.

## 3️⃣Start with Docker
Launch the application using Docker Compose:
```bash
$ docker compose up -d
```
The API will be available at ```http://localhost:3000```

## 📖 API Documentation

### Swagger UI
Access the interactive API documentation at:
👉 http://localhost:3000/docs

This comprehensive documentation provides:

<ul>
  <li>
    📋 All available endpoints
  </li>
  <li>
    🔍 Request/Response schemas
  </li>
  <li>
    🧪 Interactive testing capabilities
  </li>
  <li>
    📝 Detailed parameter descriptions
  </li>
</ul>

### Postman Collection

Prefer using Postman? Import the ready-to-use collection:

📍 Location: ```postman/bookstore-inventory-api.postman_collection.json```

This collection includes:

<ul>
  <li>
    ✅ All API endpoints pre-configured
  </li>
  <li>
    📊 Sample requests
  </li>
  <li>
    🎯 Organized folder structure
  </li>
</ul>

## 🛠️ Development

### Project Structure

📦 bookstore-inventory-api </br>
├── 📁 src/ </br>  
│   |
│   ├── 📁book/
│   │   ├── 📁 domain/           # Core business logic and entities </br> 
│   │   ├── 📁 application/      # Use cases and application services </br>
│   │    ├── 📁 infrastructure/  # External adapters and implementations </br>
│   ├── 📁core/
│       ├── 📁 application/      # Abstractions needed in the use cases </br> 
│       ├── 📁 infrastructure/   # Specific implementations of the application abstractions </br>
│       ├── 📁 utils/            # Abstractions that can be used in every layer of each module </br>
├── 📁 postman/             # Postman collection </br>
├── 📄 .env.example         # Environment template </br>
├── 📄 docker-compose.yml   # Docker configuration </br>
└── 📄 package.json         # Dependencies </br>

### Architecture Overview - Hexagonal/Three-Layer Architecture
This project follows a Hexagonal Architecture (also known as Ports and Adapters) combined with a Three-Layer Architecture, ensuring clean separation of concerns and maintainability:

<ul>
  <li>
    🏗️ Domain Layer (Core Business Logic)
  </li>
  <li>
    ⚡ Application Layer (Use Cases & Orchestration)
  </li>
  <li>
    🔌 Infrastructure Layer (External Implementations and Entry Point for Communication)
  </li>
</ul>

### Architecture Benefits
<ul>
  <li>
    ✅ Clean separation of concerns
  </li>
  <li>
    ✅ Testability (each layer can be tested independently)
  </li>
  <li>
    ✅ Technology agnostic (easy to replace infrastructure components)
  </li>
  <li>
    ✅ Maintainability (clear boundaries between components)
  </li>
  <li>
    ✅ Scalability (components can be scaled independently)
  </li>
</ul>

<p align="center"> Made by Luis Elian Montes Garcia </p><p align="center"> 