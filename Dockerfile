# =====================
# Build stage
# =====================
FROM node:20-alpine AS build

# set working directory
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# copy source code
COPY . .

# build production bundle
RUN npm run build

# =====================
# Production stage
# =====================
FROM nginx:alpine

# copy build artifacts
COPY --from=build /app/dist /usr/share/nginx/html

# copy nginx config (frontend)
COPY nginx/web.conf /etc/nginx/conf.d/default.conf

# expose port
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]