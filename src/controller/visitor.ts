import {mailjet, Request, Response} from "../../appConfig";
import eventService from "../services/event-service";
import contributorService from "../services/contributor-service";

export const ContactBloc = {
    post: (request: Request, _: Response) => {
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


export const eventPage = {
    get: async (request: Request, response: Response) => {
        const event = await eventService.findOneBy({
            'slug': request.params.slug
        });
        if(event !== null)
        {
            const speakers = [];
            const sponsors = [];
            event.contributors.forEach((contributor) => {
                if(contributor)
                {
                    response.render('public/interfaces/events/single.twig', {image: event.image, sponsors, speakers, settings: event.settings, })
                }
            })

        }
    }
}

export const contributorPublicController = {
    get: async (request: Request, response: Response) => {
        const contributor = await contributorService.findOneBy({
            event: {
                slug: request.params.eventSlug
            },
            fullName: request.params.fullName
        });
        if(contributor !== null)
        {
            response.status(200);
            response.render('/public/interfaces/events/speaker.twig', {contributor});
        } else {
            response.status(404);
            response.send();
        }
    }
}

export const Participation = {
    get: (request: Request, response: Response) => {
        response.render('/public/interfaces/events/participation.twig');
    },
    post: (request: Request, response: Response) => {

    }
}
