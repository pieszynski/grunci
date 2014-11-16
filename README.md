GrunCI
======

Grunt based Continuous Integration (pre alfa version!).

#### Build from source
To compile source you will need to install required packages and compile source code
```bash
> npm install
> grunt
```
and all what you need will appear in dist/ directory.

#### Starting
From dist/ directory start web server (see example below).
```bash
> cd dist/
> node www/app.min.js grunci.json
```

#### Development
Configuration file in 'example/grunci.json' is prepared for rapid development so only one line is required from root repository directory
```bash
> grunt dev && node dist/www/app.js dist/grunci.json
```
or event faster if you only change server side TypeScript code
```bash
> grunt ts && node dist/www/app.js dist/grunci.json
```
## TODO
