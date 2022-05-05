
Project to build moderen DEX-UI for the Peerplays on chain DEX

# Peerplays DEX

## Prerequisites

Install the build dependencies on Linux:
```
apt-get update
apt-get install build-essential nasm
```

## Installation

Node v16+ is required and it can be installed using nvm following these [installation steps](https://github.com/nvm-sh/nvm#installing-and-updating).

Clone this repo:
```
https://gitlab.com/PBSA/NEX.git -b <branch name>
```

Now make sure you are in the application's root directory. Install app dependecies:
```
npm install
```

## ENV configuration
Create a `.env.local` file in the root of the repository:

```
cp .env.example .env.local
```

.env.local
```
# Token symbol
DEFAULT_TOKEN=''

# Token symbol
DEFAULT_QUOTE=''

# Full URL to the blockchain's faucet
FAUCET_URL=''

# Full URL to your DEX instance
DEX_URL=''

# Chain ID of the blockchain
DEFAULT_CHAIN_ID=''

# Blockchain API endpoints (websocket)
BLOCKCHAIN_ENDPOINTS=''
```

## Mannual Starting after installation and ENV configuration
### Development
```
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
### Production
Install pm2 globally:
```
 npm install pm2 -g
```

Now make sure you are in the application's root directory. Build the production distribution:
```
npm run build
```

Make sure you are in the application's root directory. Serve the application:
```
pm2 start npm --name <must be unique> -- start
```

#### Exmaple NGINX Configuration:

```
server {
  listen 80;
  listen [::]:80;

  server_name market.commodity.llc www.market.commodity.llc;

  location / {
    proxy_pass http://localhost:1111;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location ~ ^/[\w\d\.-]+\.(js|css|dat|png|json|ico)$ {
           try_files $uri $uri/wallet =404;
      }

  location / {
            index index.html index.htm;
            try_files $uri /index.html;
    }
}
```


Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.