# Use Node 20 (Next.js 15+ requires >=20.9)
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the app
RUN pnpm build

# Expose Next.js port
EXPOSE 3000

# Run the app
CMD ["pnpm", "start"]
