# imagier

Simple Vue app to help children learn the alphabet.

## Building and running the app

### Installing the dependencies

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

## Builds and deploys to production

```
./scripts/deploy.sh
```

## Asset management

The app relies on an asset catalog stored in `/src/assets/public.json`. The associated resources (images and sounds) are stored in `/src/assets/images/`. A utility script is provided to check and correct the asset catalog content and generate missing sound files using AWS Polly.

To run this script :

```
pipenv shell
python scripts/check_assets.py
```
