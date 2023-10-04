import * as express from 'express';
import {Response} from "express";
import * as bodyParser from "body-parser";
import {AppDataSource} from "./data-source";
import {Routes} from "./routes";
import * as path from "path";
import * as session from 'express-session';
import "reflect-metadata";
import {join} from "path";
import * as fileUpload from "express-fileupload";
import {downloadFile, Request} from "../appConfig";
import * as cors from "cors";
import * as connect_memcached from "connect-memcached";

const checkRole = (req: Request, res: Response, next: Function, role: string) => {
    if (role === undefined) {
        next();
    } else {
        if ( req.session?.user !== undefined) {
            if (req.session.user.role !== role) {
                res.status(403);
            } else {
                next();
            }
        } else {
                res.status(200).redirect('/public/auth/login');
        }
    }
}
const MemcachedStore = connect_memcached(session);
AppDataSource.initialize().then(async () => {
    const app = require('express')();
    app.use(cors());
    app.use(require('flash-express')());
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
        store: new MemcachedStore({
            hosts: ["127.0.0.1:11211"],
            secret: "123, easy as ABC. ABC, easy as 123" // Optionally use transparent encryption for memcached session data
        }),
        secret: 'secret$%^134',
        resave: true,
        saveUninitialized: false,
        proxy: true,
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

    app.use(function (req: Request, res: Response, next: Function) {
        res.locals.req = req;
        res.locals.flash = req.flash;
        next();
    });

    app.get('/', (_: Request, response: Response) => {
        return response.render('public/interfaces/visitor/index.twig');
    });

    app.get('/uploads/:filename', downloadFile);
    app.post('/upload', (req: Request, res: Response, _: Function) => {
        req.files.file.mv(join(__dirname, `uploads/${req.files.file.name}`), (err: any) => {
            if (err === undefined) {
                res.send('hello world');
            }
        });
    });

    function test_controller(_: any, response: Response) {
        response.render('test/test.twig');
    }

    function test_2_controller(_: any, response: Response)
    {
        response.render('test/test2.twig');
    }

    function pricing_page(_:any, response: Response)
    {
        response.render('public/interfaces/visitor/');
    }

    app.get('/test1', test_controller);
    app.get('/test2', test_2_controller);
    // register express routes from defined application routes
    Routes.forEach(route => {
        app[route.method](route.route, (req, res, next) => {
            checkRole(req, res, next, route?.roleUserToAccess);
        }, (req: any, res: Response, next: Function) => {
            const result = route.controller[route.action](req, res, next);
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
