# Update system
apt update -y && apt upgrade -y

# Install Node.js (LTS)
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs git nginx postgresql-client

# Setup Nginx proxy
cat > /etc/nginx/sites-available/default << 'EOF'
server {
    listen 80;
    server_name simplifiedapps.work www.simplifiedapps.work;

    # Redirect all HTTP traffic to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name simplifiedapps.work www.simplifiedapps.work;

    ssl_certificate /etc/ssl/cloudflare/origin.crt;
    ssl_certificate_key /etc/ssl/cloudflare/origin.key;
    ssl_dhparam /etc/ssl/certs/dhparam.pem;

    location / {
        proxy_pass http://localhost:3000;  # adjust if your app runs on a different port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 256;
}

EOF

openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
systemctl restart nginx

# Firewall - allow SSH and Nginx
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable

# Clone your repo
cd /home/ubuntu
git clone https://github.com/Frederico-TWT/todo-app.git app
cd app

# Add .env file (replace with your actual values or inject later)
cat > .env << 'EOF'
DATABASE_URL=postgresql://nextjsadmin:Password123@nextjs-db.cz2q0q860axg.eu-west-1.rds.amazonaws.com:5432/todoapp
EOF

# Build and run app
npm install -g pm2
npm install
npm run build
pm2 start npm --name "nextjs-todo-app" -- run start
pm2 save
pm2 startup systemd
