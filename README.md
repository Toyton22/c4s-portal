# c4s-portal

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### after initialising firebase.json, add following to it, then deploy
```
,
"rewrites": [
  {
    "source": "**",
    "destination": "/index.html"
  }
]
```