import {ModelCrudServiceImplementation} from "./ModelCrudService";
import {ProfileModel, User, UserModel} from "../../entities/User";
import {hash} from 'bcrypt';
import {SECRET_KEY} from "../../../appConfig";
import {userRepository} from "../../repositories";
import {IModelCrudService} from "../interfaces/IModelCrud";


export function UserServiceImplementation(): IModelCrudService<UserModel, User> {

    return {
        ...ModelCrudServiceImplementation<UserModel, User>(userRepository),
        create: async (instance: User): Promise<User> => {
            const userModel = new UserModel();
            userModel.email = instance.email;
            userModel.username = instance.username;
            userModel.is_superuser = false;
            userModel.is_active = true;
            userModel.role = instance.role;
            userModel.password = await hash(instance.password, SECRET_KEY);
            if (instance.profile !== undefined) {
                userModel.profile = new ProfileModel();
                userModel.profile.firstname = instance.profile.firstname;
                userModel.profile.lastname = instance.profile.lastname;
                userModel.profile.gainedAmount = 0;
                userModel.profile.address = instance.profile.address;
                userModel.profile.phone = instance.profile.phone;
            }
            await this.repository.save(userModel);
            userModel.profile.user = userModel;
            await this._profileRepository.save(userModel.profile);
            instance.id = userModel.id
            return (userModel as User);
        }
    }
}
