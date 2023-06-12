import * as express from "express"
import * as bodyParser from "body-parser"
import {Request, Response} from "express"
import {AppDataSource} from "./data-source"
import {Routes} from "./routes"
import * as path from "path";
import * as session from 'express-session';
import RedisStore from "connect-redis";
import "reflect-metadata";
import {UserModel} from "./entity/User";
const redis = require("redis");
const {upload} = require('../appConfig');
let createEngine = require('node-twig').createEngine;
AppDataSource.initialize().then(async () => {
    const userRepository = AppDataSource.getRepository(UserModel);
    let admin = await userRepository.findOneBy({username: 'admin'});

    if (admin == null) {
        admin = AppDataSource.getRepository(UserModel).create({
            username: 'admin',
            email: 'omartrikji712@gmail.com',
            is_superuser: true,
            password: "hello world"
        });
        await admin.setPassword("admin@admin");
        await userRepository.save(admin);
    }
    // create express app
    const app = express();
    const cors = require('cors');
    app.use(cors());
    app.use(require('connect-flash')());
    app.set('/', 'static');
    app.use(upload.any())
    app.set("twig options", {
        allowAsync: true, // Allow asynchronous compiling
        strict_variables: false
    });
    app.set('trust proxy', 1);
    const redisClient = redis.createClient();
    redisClient.on('error', function (err) {
        console.log('Could not establish a connection with redis. ' + err);
    });
    redisClient.on('connect', function (err) {
        console.log('Connected to redis successfully');
    });
    await redisClient.connect();
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'twig');
    app.use(bodyParser.json());
    app.use(express.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname, 'static')));

    app.use(session({
        store: new RedisStore({client: redisClient}),
        secret: 'secret$%^134',
        resave: true,
        saveUninitialized: false,
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: false, // if true prevent client side JS from reading the cookie
            maxAge: 3600 * 60 * 60 * 24 // session max age in miliseconds
        }
    }));

    app.use(function (req, res, next) {
        res.locals.req = req;
        next();
    });

    app.get('/', (req, res) => {
        res.render('index.twig');
    })
    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        })
    })
    app.listen(3000);
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
}).catch(error => console.log(error))
