import {mailjet, Request, Response} from "../../appConfig";
import retryTimes = jest.retryTimes;

export const indexPage = () => {
    return {
        get: (request: Request, response: Response) => response.render('visitor/index.twig')
    }
}

export const ContactPage = () => {
    return {
        get: (request: Request, response: Response) => response.render('public/interfaces/visitor/contact.twig'),
        post: (request: Request, response: Response) => {
            if (request.method === 'POST') {
                mailjet.post('send', {version: 'v3.1'}).request({
                    Messages: [
                        {
                            From: {
                                Email: "pilot@mailjet.com",
                                Name: "Mailjet Pilot"
                            },
                            To: [
                                {
                                    Email: "passenger1@mailjet.com",
                                    Name: "passenger 1"
                                }
                            ],
                            Subject: "Your email flight plan!",
                            TextPart: "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                            HTMLPart: `
                    
                    
                 
                    `
                        }
                    ]
                })
            }
        }
    }
}