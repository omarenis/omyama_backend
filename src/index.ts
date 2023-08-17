import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {AppDataSource} from "./data-source";
import {Routes} from "./routes";
import * as path from "path";
import * as session from 'express-session';
import "reflect-metadata";
import {UserModel} from "./entity/User";
import {join} from "path";

import fileUpload from "express-fileupload";

const {downloadFile} = require('../appConfig.js');

const ConnectCouchDB = require('connect-couchdb')(session);
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
    app.set("twig options", {
        allowAsync: true, // Allow asynchronous compiling
        strict_variables: false
    });
    app.set('trust proxy', 1);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'twig');
    app.use(bodyParser.json());
    app.use(express.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname, 'static')));
    app.use(session({
        store: new ConnectCouchDB({
            name: 'session',
            host: "db_server_ip_address",
            port: 5984,
            username: 'username',
            password: 'password',
            ssl: false
        }),
        secret: 'secret$%^134',
        resave: true,
        saveUninitialized: false,
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: false, // if true prevent client side JS from reading the cookie
            maxAge: 3600 * 60 * 60 * 24 // session max age in miliseconds
        }
    }));

    app.use(fileUpload({
        limits: {fileSize: 50 * 1024 * 1024},
        createParentPath: true,
        safeFileNames: true,
        preserveExtension: true
    }));

    app.use(function (req: any, res, next) {
        res.locals.req = req;
        next();
    });
    app.get('/test', function (request: Request, response: Response) {
        response.render('test.twig');
    });

    app.get('/uploads/:filename', downloadFile);
    app.post('/upload', (req: any, res, next) => {
        req.files.file.mv(join(__dirname, `uploads/${req.files.file.name}`), (err) => {
            if (err === undefined) {
                res.send('hello world');
            }
        });
    });

    function index_controller(request: Request, response: Response) {
        response.render('test.twig');
    }
    app.get('/test', index_controller);
    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    app.listen(3000);
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
}).catch(error => console.log(error));
