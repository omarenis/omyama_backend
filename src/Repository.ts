import {AppDataSource} from "./data-source";
import { ContributorModel } from "./entity/Contributor";
import {EventModel} from "./entity/Event";
import {ProfileModel, UserModel} from "./entity/User";
import {ParticipationModel} from "./entity/Participation";
import {TicketModel} from "./entity/Ticket";

export const eventRepository = AppDataSource.getRepository(EventModel);
export const profileRepository = AppDataSource.getRepository(ProfileModel);
export const contributorRepository = AppDataSource.getRepository(ContributorModel);
export const userRepository = AppDataSource.getRepository(UserModel);
export const participationRepository = AppDataSource.getRepository(ParticipationModel);
export const TicketRepository = AppDataSource.getRepository(TicketModel);
