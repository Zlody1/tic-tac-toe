# Tic-Tac-Toe Game

A full-stack tic-tac-toe game with Java Spring Boot backend and TypeScript frontend.

## Prerequisites

- Java 23
- Maven 3.6+
- Node.js 18+
- npm

## Build and Run Locally

### 1. Build Frontend
```bash
npm install
npm run build
```

### 2. Build and Run Backend
```bash
mvn clean package
mvn spring-boot:run
```

### 3. Access the Game
Open your browser and go to: `http://localhost:8080/field.html`

## Development Mode

For frontend development with watch mode:
```bash
npm run watch
```

## Features

- Make elements to fit in any screen. For example, on wide screen scoreboard appears on right side of the board. On mobile scoreboard appears under the board.

- Make game log table, that shows 10 last results. Time and winner of the game.

