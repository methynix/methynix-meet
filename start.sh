#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}Methynix Connect - Quick Start${NC}"
echo -e "${BLUE}================================${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo -e "${YELLOW}Node.js is not installed. Please install Node.js 16 or higher.${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Node.js version: $(node -v)${NC}\n"

# Function to start a service
start_service() {
  local service_name=$1
  local service_path=$2
  local start_command=$3

  echo -e "${BLUE}Setting up ${service_name}...${NC}"

  if [ ! -d "$service_path/node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies for ${service_name}...${NC}"
    cd "$service_path"
    npm install

    if [ ! -f .env ]; then
      echo -e "${YELLOW}Copying .env.example to .env for ${service_name}...${NC}"
      cp .env.example .env 2>/dev/null || echo -e "${YELLOW}Note: No .env.example found for ${service_name}${NC}"
    fi
    cd - > /dev/null
  else
    echo -e "${GREEN}✓ Dependencies already installed for ${service_name}${NC}"
  fi
}

# Start both services
echo -e "${BLUE}Preparing services...${NC}\n"
start_service "Backend" "./server" "npm start"
start_service "Frontend" "./client" "npm run dev"

echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}Starting Methynix Connect${NC}"
echo -e "${GREEN}================================${NC}\n"

# Start services in parallel
echo -e "${BLUE}Backend:${NC} http://localhost:5000"
echo -e "${BLUE}Frontend:${NC} http://localhost:5173\n"

# Start both servers in background and wait for signals
(
  cd server
  npm start &
  SERVER_PID=$!
  echo -e "${GREEN}✓ Backend started (PID: $SERVER_PID)${NC}"
)

(
  cd client
  npm run dev &
  CLIENT_PID=$!
  echo -e "${GREEN}✓ Frontend started (PID: $CLIENT_PID)${NC}"
)

# Wait for both processes
wait

echo -e "\n${YELLOW}Application stopped${NC}"
