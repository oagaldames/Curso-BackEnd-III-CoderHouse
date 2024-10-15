import { MocksServices } from "../services/mocks.services.js";

export class MockControllers {
    constructor() {
        this.mocksServices = new MocksServices();
    }

    mockingPets = async (req, res, next) => {
        try {
            const petsResponse = await this.mocksServices.createPetsMocks(100);
            res.status(201).json({ status: "ok", payload: petsResponse });
        } catch (error) {
            error.path = "[GET] api/mocks/mockingpets - Class MockControllers.mockingPets";
            next(error);
        }
    };

    mockingUsers = async (req, res, next) => {
        try {
            const usersResponse = await this.mocksServices.createUsersMocks(50);
            res.status(201).json({ status: "ok", payload: usersResponse });
        } catch (error) {
            error.path = "[GET] api/mocks/mockingusers - Class MockControllers.mockingUsers";
            next(error);
        }
    };

    generateData = async (req, res, next) => {
        try {
            const { cu, cp } = req.params;
            const usersResponse = await this.mocksServices.createUsersMocks(cu);
            const petsResponse = await this.mocksServices.createPetsMocks(cp);

            res
                .status(201)
                .json({ status: "ok", payload: { usersResponse, petsResponse } });
        } catch (error) {
            error.path = "[GET] api/mocks/generateData - Class MockControllers.generateData";
            next(error);
        }
    };

}
