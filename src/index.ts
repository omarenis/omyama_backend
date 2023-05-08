import * as express from "express"
import * as bodyParser from "body-parser"
import {Request, Response} from "express"
import {AppDataSource} from "./data-source"
import {Routes} from "./routes"
import * as path from "path";
import * as session from 'express-session';
import RedisStore from "connect-redis";

const redis = require("redis");
let createEngine = require('node-twig').createEngine;
AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.set('/', 'static');
    app.set("twig options", {
        allowAsync: true, // Allow asynchronous compiling
        strict_variables: false
    });
    app.set('trust proxy', 1);

    const redisClient = redis.createClient({
        url :'redis://127.0.0.1:6379'
    });
    redisClient.on('error', function (err) {
        console.log('Could not establish a connection with redis. ' + err);
    });
    redisClient.on('connect', function (err) {
        console.log('Connected to redis successfully');
    });

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'twig');
    app.use(bodyParser.json());

    app.use(express.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname, 'static')));

    app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
}))

    app.get('/', (req, res) => {
        res.render('index.twig');
    })
    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    app.listen(3000);

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
