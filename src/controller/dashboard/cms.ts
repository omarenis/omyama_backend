
import {ModelCrudServiceImplementation} from "../../services/implementations/ModelCrudService";
import { Response} from "../../../appConfig";
import {Block, BlockModel} from "../../entities/cms/Block";
import {blockRepository} from "../../repositories";
const BlockService = ModelCrudServiceImplementation<BlockModel, Block>(blockRepository);
const Header = (request: any, response: Response) => {
    if (request.method === 'POST') {

    }

    response.render('')
}
