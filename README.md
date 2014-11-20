GrunCI
======

Grunt based Continuous Integration (not even pre alfa version!).

#### Current status
* in DEV build on website refresh - auto build project named 'build1' outputing progress to website
* resolve long building vs. 4096B browser receive cache (browser side - regex remove trailing spaces)

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
