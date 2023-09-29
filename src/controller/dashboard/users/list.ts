import {Request, Response} from "../../../../appConfig";
import {ModelCrudServiceImplementation} from "../../../services/implementations/ModelCrudService";
import {User, UserModel} from "../../../entities/User";
import {userRepository} from "../../../repositories";
import {IModelCrudService} from "../../../services/interfaces/IModelCrud";

const userService: IModelCrudService<UserModel, User> = ModelCrudServiceImplementation<UserModel, User>(userRepository);
export const UsersView = {
    get: async (request: Request, response: Response) => {
        const filter = {};
        if (request.query.firstname) {
            filter['firstname'] = request.query.firstname;
        }
        if (request.query.lastname) {
            filter['firstname'] = request.query.lastname;
        }
        const users = (await (Object.keys(filter).length === 0 ? userService.findAll() : userService.findBy(filter)) as User[]);
        response.render('dashboard/users/list.twig', {objects: users});
    }
}
const UserView = () => {
    return {
        get: async (request: Request, response: Response) => {
            const user = await userService.findOneBy({id: request.params.id});
            if (user === null) {
                return response.status(404).json({message: 'User not found'});
            }
            response.render('')
        }
    }
}
