import {ModelCrudServiceImplementation} from "./ModelCrudService";
import {Profile, ProfileModel, User, UserModel} from "../../entity/User";
import {AppDataSource} from "../../data-source";
import {hash, genSalt} from 'bcrypt';
import {SECRET_KEY} from "../../../appConfig";
import {Repository} from "typeorm";


export class UserServiceImplementation extends ModelCrudServiceImplementation<UserModel, User> {
    private _profileRepository:  Repository<ProfileModel>;

    constructor() {
        super(UserModel);
        this._profileRepository = AppDataSource.getRepository(ProfileModel);
    }

    async create(instance: User): Promise<User> {
        const userModel = new UserModel();
        userModel.email = instance.email;
        userModel.username = instance.username;
        userModel.is_superuser = false;
        userModel.is_active = true;
        userModel.password = await  hash(instance.password, SECRET_KEY);
        if (instance.profile !== undefined) {
            userModel.profile = new ProfileModel();
            userModel.profile.firstname = instance.profile.firstname;
            userModel.profile.lastname = instance.profile.lastname;
            userModel.profile.gainedAmount = 0;
            userModel.profile.address = instance.profile.address;
            userModel.profile.phone = instance.profile.phone;
        }
        await this.repository.save(userModel);
        instance.id = userModel.id
        return instance;
    }
}
