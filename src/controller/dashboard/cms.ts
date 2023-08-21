
import {ModelCrudServiceImplementation} from "../../services/implementations/ModelCrudService";
import { Response} from "../../../appConfig";
import {Block, BlockModel} from "../../entity/cms/Block";
const BlockService = new ModelCrudServiceImplementation<BlockModel, Block>(BlockModel);
const Header = (request: any, response: Response) => {
    if (request.method === 'POST') {

    }

    response.render('')
}
