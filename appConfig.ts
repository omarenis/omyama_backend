import tokens from "csrf";

import {join} from "path";

import {Request as GlobalRequest, Response as GlobalResponse} from "express";


export interface Request extends GlobalRequest
{
    flash: any;
}

export interface Response extends GlobalResponse
{

}

export const SECRET_KEY = "$2b$10$bqgY5QHENX0IcRDfg8.upO";
export const REDIS_SECRET_KEY = "2(DCA4Vjjdt)y#B*W8Fu38#gD2a$qTV5Wsb23Du#pW7&WVsk3TW%8IIF!*R%MTy^";
export const type = "mysql";
export const host = "localhost";
export const port = 3306;
export const username = "test";
export const password = "test";
export const database = "test";

export const saveFile = async (file) => {
    await file.mv(join(__dirname, `uploads/${file.name}`), async (err) => {
        if (err !== undefined) {
            throw err;
        }
    });
    return true;
}
export const downloadFile = (req: Request, res: Response) => {
        res.download(join(__dirname, `uploads/${req.params.filename}`))
};
