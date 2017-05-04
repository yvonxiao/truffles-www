# truffles-www

> truffles website project

the master branch adds webpack with HMR support and file hash cache.

the release-tradition-1.0 is the initial form which is just using koa2,ejs to build a simple website.

### build develop environment with HMR support
``` bash
npm install
npm run build-dev
npm run start
```

### build production environment
``` bash
npm install
npm run build-prod
```
upload public/dist files to CDN
``` bash
npm run pm2
```