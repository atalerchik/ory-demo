# Ory.sh Demo

## Running

### Running ORY Kratos in docker (docker-compose)

1. Go to the Kratos directory

```bash
cd ory/kratos/
```

2. Start Kratos service in docker

```bash
docker-compose -f quickstart.yml -f quickstart-standalone.yml up --build --force-recreate
```

### Running ORY Keto in docker (docker-compose)

1. Go to the Keto directory

```bash
cd ory/keto/
```

2. Start Keto service in docker

```bash
docker-compose -f docker-compose.yml up
```

### Start project

0. Install requierd node version (nvm)

```bash
nvm install v20.6.1
nvm use
```

1. Install packages

```bash
npm install
```

2. Running application

```bash
npm run start
```

3. Start proxy for application

```bash
npm run proxy
```

### URL's

- Project URL: http://localhost:4000/    
- For receive emails (mailslurper): http://localhost:4436/    
- ORY Kratos UI: http://localhost:4455/welcome    
