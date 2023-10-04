import { Request, Response } from "../../../../appConfig"
import participationService from "../../../services/participation-service"

const ParticipantsController = {
    get: async (request: Request, response: Response) => {
        response.render('dashboard/events/participations.twig', {
            participation: participationService.findBy({
                event: request.params.id
            })
        })
    }
}
