import 'reflect-metadata';
import 'tslib';

import * as express from 'express';

import { useContainer, useExpressServer } from 'routing-controllers';

import { Container } from 'typedi';

let app = express();

let morgan = require('morgan'),                     //log
    cookieParser = require('cookie-parser'),        //cookie
    bodyParser = require('body-parser'),            //body
    compress = require('compression'),              //gzip
    cors = require('cors');                         //cors

app.use(morgan('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(compress({}))
    .use(cors())
    .disable('x-powered-by');

useContainer(Container);

//more info pls see https://github.com/pleerock/routing-controllers
useExpressServer(app, {
    controllers: [__dirname + '/controllers/**/*.js'],
    middlewares: [__dirname + '/middlewares/**/*.js'],
    interceptors: [__dirname + '/interceptors/**/*.js'],
    useClassTransformer: true,
    enableValidation: true,
});

app.listen(process.env.PORT || 3000, () => {
    app._router.stack.forEach((r: any) => {
        if (r.route && r.route.path) {
            let keys = Object.keys(r.route.methods);
            for (let key of keys) {
                console.log(key + ': ' + r.route.path);
            }
        }
    });
});