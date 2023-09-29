import {AppDataSource} from "./data-source";
import { ContributorModel } from "./entities/Contributor";
import {EventModel} from "./entities/Event";
import {ProfileModel, UserModel} from "./entities/User";
import {ParticipationModel} from "./entities/Participation";
import {TicketModel} from "./entities/Ticket";
import {BlockModel} from "./entities/cms/Block";
import { Repository } from "typeorm";
import {PageModel} from "./entities/cms/Page";
import {ProgramItemModel} from "./entities/ProgramIntem";

export const eventRepository: Repository<EventModel> = AppDataSource.getRepository(EventModel);
export const profileRepository = AppDataSource.getRepository(ProfileModel);
export const contributorRepository = AppDataSource.getRepository(ContributorModel);
export const userRepository = AppDataSource.getRepository(UserModel);
export const participationRepository = AppDataSource.getRepository(ParticipationModel);
export const TicketRepository = AppDataSource.getRepository(TicketModel);
export const blockRepository = AppDataSource.getRepository(BlockModel);
export const pageRepository: Repository<PageModel> = AppDataSource.getRepository(PageModel);
export const programRepository: Repository<ProgramItemModel> = AppDataSource.getRepository(ProgramItemModel);
