import {ModelCrudServiceImplementation} from "../../services/implementations/ModelCrudService";
import {Block, BlockModel} from "../../entity/cms/Block";
import { Request, Response } from "../../../appConfig";

interface Image
{
    src: string;
    alt: string;
}

interface Link
{
    label: string;
    href: string;
}
function serializeDataFromStringToObject<T>(data: string)
{
    return (JSON.parse(data) as T)
}

const blockService = new ModelCrudServiceImplementation<BlockModel, Block>(BlockModel)
export function ImageForm(request: Request, response: Response): void | Response
{
    if(request.method === 'POST')
    {
        const content = JSON.stringify({
            src: request.files.length === 0 ? request.body.url : request.files[0].name,
            alt: request.body.alt
        });
        return response.json({
            message: 'block image created'
        }).status(201).send();
    }
    if(request.method === 'PUT') {

    }
    return response.render('cms/dashboard/components/image.twig');
}


export const  blockForm = (request: Request, response: Response) => {
    const block = request.body;
    if(request.body.type === 'image')
    {

    } else
    {
        switch (request.query.type){
            case 'image':
                return response.render('cms/dashboard/components/image.twig');
            case 'link':
                return response.render('cms/dashboard/components/link.twig');
            case 'card':
                return response.render('cms/dashboard/components/card.twig');
            case 'slide':
                return response.render('cms/dashboard/components/slide.twig');
        }
    }
}
