# Hotel Rating System
Welcome to the Hotel Rating System Microservices project. This is a full-stack application built using a microservices architecture, the application facilitates a [hotel rating system] where users can register, view hotel information, and submit ratings. The front-end is developed with React.js and Vite, providing a fast and modern user experience.

## Architecture
The application is composed of several independent microservices that communicate with each other over well-defined APIs. An API Gateway handles all incoming requests and routes them to the appropriate service, while a Config Server manages the centralized configuration for all microservices.

## Services
The back-end consists of the following services:

### 1. User Service
-   **Description:** Manages all user-related data and operations, including registration, login, and user profile management.
-   **Endpoint:** `http://localhost:8081/api/v1/auth`, `http://localhost:8081/api/v1/user`

### 2. Hotel Service
-   **Description:** Handles information related to hotels, such as listings, details, and availability.
-   **Endpoint:** `http://localhost:8082/hotel`

### 3. Rating Service
-   **Description:** Stores and retrieves user-submitted ratings and reviews for hotels.
-   **Endpoint:** `http://localhost:8083/rating`

### 4. Config Server
-   **Description:** Centralized configuration management for all microservices. Services retrieve their configuration from this server at startup.
-   **Endpoint:** `http://localhost:8085/config`

### 5. API Gateway
-   **Description:** The single entry point for all client requests. It routes requests to the appropriate microservice, providing cross-cutting concerns like security, monitoring, and resiliency.
-   **Endpoint:** `http://localhost:8084`

## Technologies Used
**Back-End:**
-   back-end framework :- Java, Spring Boot, Spring Security, Jwt Authentication, Spring Cloud Eureka, etc.
-   database technologies :- MySQL, PostgreSQL and MongoDB
-   Using RestTemplate for restful communication with eachother

**Front-End:**
-   **React.js:** A JavaScript library for building user interfaces.
-   **Vite:** A fast build tool for front-end development.
-   **UI Library, React-Router-DOM, React-Toastify, React-Axios, ReactStrap, Bootstrap CSS, etc.**


## Checking Service Status
#### - Eureka Server:
 - Eureka Dashboard: http://localhost:8761
  - You can check the status of all registered microservices here. It will show which services are up and running and their corresponding instances.
Instances currently registered with Eureka:

![image alt](https://github.com/Hemant15-Bl/Microservices/home/Readme.png)
