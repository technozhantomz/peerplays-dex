# Peerplays DEX

## Prerequisites

Install the build dependencies on Linux:
```
apt-get update
apt-get install build-essential nasm
```

## Installation

Node v14+ is required and it can be installed using nvm following these [installation steps](https://github.com/nvm-sh/nvm#installing-and-updating).
```
npm install
```

## ENV configuration
Create a `.env` file in the root of the repository:

```
cp example.env .env
```

.env
```
# Token symbol
DEFAULT_TOKEN='LLC'

# Token symbol
DEFAULT_QUOTE='BTC'

# Full URL to the blockchain's faucet
FAUCET_URL='https://create.commodity.llc/api/v1/accounts'

# Full URL to your DEX instance
DEX_URL='https://commodity.llc'

# Chain ID of the blockchain
DEFAULT_CHAIN_ID='23a8ad8acbf73c93829c998a69f7eda005fba8518156e824d5a1998fa7031234'

# Blockchain API endpoints (websocket)
BLOCKCHAIN_ENDPOINTS='wss://login.commodity.llc/ws'
```

## Starting after installation and ENV configuration
### Development
```
npm start
```
### Production
Build the production distribution:
```
npm run build
```
Static files will be created in `./dist` and can be served with a web server like [NGINX](https://www.nginx.com/).
#### Exmaple NGINX Configuration:
nginx.conf
```
server {
    listen 80;
    root /srv/www/peerplays-dex;
    index index.html index.htm;
    location / {
       try_files $uri /index.html;
    }
}
```


## Docker
Install the latest version of [Docker](https://docs.docker.com/get-docker/).

### Build
After [configuring your ENV](#ENV-configuration), build the image:

#### Development
```
docker build . -f dev.Dockerfile -t peerplays/peerplays-dex-dev
```

#### Production
```
docker build . -f prod.Dockerfile -t peerplays/peerplays-dex
```

### Run
After building the image, run a container:

#### Development
```
docker run -d -p 8080:8080 peerplays/peerplays-dex-dev 
```
The application will be available at http://localhost:8080.
#### Production
```
docker run -d -p 80:80 peerplays/peerplays-dex
```
The application will be available at http://localhost.
