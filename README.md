# arbitrage-ui

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# Create config json file with firebase credentials

cd src/config/

# mac
touch config.json

# or windows
echo "" > config.json
```

```json
{
  "init": {
    "apiKey": "",
    "authDomain": "",
    "databaseURL": "",
    "projectId": "",
    "storageBucket": "",
    "messagingSenderId": ""
  }
}
```


# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
