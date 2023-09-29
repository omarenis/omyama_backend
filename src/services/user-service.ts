import {ModelCrudServiceImplementation} from "./implementations/ModelCrudService";
import {UserModel, User, ProfileModel, Profile} from "../entities/User";
import {profileRepository, userRepository} from "../repositories";
import {IModelCrudService} from "./interfaces/IModelCrud";

export const userService: IModelCrudService<UserModel, User> = ModelCrudServiceImplementation<UserModel, User>(userRepository);
export const profileService: IModelCrudService<ProfileModel, Profile> = ModelCrudServiceImplementation<ProfileModel, Profile>(profileRepository);
