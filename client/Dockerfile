# Multi-stage build for React application

# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the React app with API URL environment variable
ARG REACT_APP_API_URL=https://todolistreactapi-0v4z.onrender.com
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built app from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
