## Getting Started

First, Setup PostgresSql In your system and set DATABASE_URL and as in config.json

then, install the depedencies

````bash
npm install
# or
yarn install

then, run the migrations:

```bash
npm run migrate up --dir ./migrations
# or
yarn migrate up --dir ./migrations
````

then, start the server:

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
