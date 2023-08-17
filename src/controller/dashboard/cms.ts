
import {ModelCrudServiceImplementation} from "../../services/implementations/ModelCrudService";
import {Request, Response} from "../../../appConfig";
const BlockService = new ModelCrudServiceImplementation<Block>();
const Header = (request: Request, response: Response) => {
    if (request.method === 'POST') {

    }

    response.render('')
}
