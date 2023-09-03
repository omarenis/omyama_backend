import {Request, Response} from "../../../../appConfig";
import {ModelCrudServiceImplementation} from "../../../services/implementations/ModelCrudService";
import {User, UserModel} from "../../../entity/User";
    const userService = new ModelCrudServiceImplementation<UserModel, User>(UserModel);
export const UsersView = (request: Request, response: Response) => {
    return {
        get: async (request: Request, response: Response) => {
            const filter = {};
            if(request.query.firstname)
            {
                filter['firstname'] = request.query.firstname;
            }
            if(request.query.lastname)
            {
                filter['firstname'] = request.query.lastname;
            }
            const users = (await (Object.keys(filter).length === 0 ?  userService.list() : userService.getBy(filter) )as User[]);
            response.render('dashboard/users/list.twig', {objects: users});
        }
    }
}
const UserView = () => {
    return {
        get: async (request: Request, response: Response) => {
            const user = await userService.getBy({id: request.params.id});
            if(user === null)
            {
                return response.status(404).json({message: 'User not found'});
            }
            response.render('')
        }
    }
}
