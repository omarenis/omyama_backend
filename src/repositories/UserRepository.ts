import {AppDataSource} from "../data-source";
import {UserModel, User} from "../entity/User";

export default class UserRepository {
    private readonly _userModelRepository = AppDataSource.getRepository(UserModel);

    list() {
        const data: User[] = [];
        let user = null;
        this._userModelRepository.find().then((userModels: UserModel[]) => {
            userModels.forEach((userModel: UserModel) => {
                data.push(new User(userModel.username, userModel.email, null, userModel.id))
            })
        });
        return data;
    }
}
