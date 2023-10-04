import {Request as GlobalRequest, Response as GlobalResponse} from "express";
import {join} from "path";

const Mailjet = require('node-mailjet');
export interface Request extends GlobalRequest {
    files: any;
    session: any;
    flash: any;
}

export interface Response extends GlobalResponse {

}

export const SECRET_KEY: string = "$2b$10$bqgY5QHENX0IcRDfg8.upO";
export const REDIS_SECRET_KEY: string = "2(DCA4Vjjdt)y#B*W8Fu38#gD2a$qTV5Wsb23Du#pW7&WVsk3TW%8IIF!*R%MTy^";
export const type = "mysql";
export const host = "127.0.0.1";
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
    return file.name;
}
export const downloadFile = (req: any, res: Response) => {
    res.download(join(__dirname, `uploads/${req.params.filename}`))
};
export const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || 'a28d6f4d62fc3287e3bbd671801c701c',
  apiSecret: process.env.MJ_APIKEY_PRIVATE || 'b5732de68dd76e9b6ba0bb215da277f7'
});
