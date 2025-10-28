# Stage 1 — Build Angular app
FROM node:latest AS build

WORKDIR /usr/local/app

# Copy package files first to leverage Docker cache
COPY ./ /usr/local/app/
RUN npm install


RUN npm run build

# Stage 2 — Serve with Nginx
FROM nginx:alpine

# Copy built Angular files
COPY --from=build /usr/local/app/dist/way-matching/browser /usr/share/nginx/html



# Expose port 80
EXPOSE 80


