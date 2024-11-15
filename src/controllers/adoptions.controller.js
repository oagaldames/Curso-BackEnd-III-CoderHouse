
import { UserServices } from "../services/user.services.js";
import { AdoptionServices } from "../services/adoption.services.js";
import { PetServices } from "../services/pet.services.js";
import mongoose from "mongoose";
export class AdoptionsController {
  constructor() {
    this.adoptionsService = new AdoptionServices();
    this.usersService = new UserServices();
    this.petsService = new PetServices();
  }

  getAllAdoptions = async (req, res, next) => {
    try {
      const result = await this.adoptionsService.getAll();
      res.send({ status: "success", payload: result });
    } catch (error) {
      error.path = "[GET] api/adoptions - Class AdoptionsController.getAllAdoptions";
      next(error);
    }
  };

  getAdoption = async (req, res, next) => {
    try {
      const adoptionId = req.params.aid;
      if (!mongoose.Types.ObjectId.isValid(adoptionId)) {
        return res.status(400).send({ status: "error", error: "Invalid Adoption ID format" });
      }
      const adoption = await this.adoptionsService.getById(adoptionId);
      if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });
      res.send({ status: "success", payload: adoption });
    } catch (error) {
      error.path = "[GET] api/adoptions/:aid - Class AdoptionsController.getAdoption";
      next(error);
    }
  };

  createAdoption = async (req, res, next) => {
    try {
      const { uid, pid } = req.params;
      if (!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(400).send({ status: "error", error: "Invalid User ID format" });
      }
      if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).send({ status: "error", error: "Invalid Pet ID format" });
      }
      const user = await this.usersService.getById(uid);
      if (!user) return res.status(404).send({ status: "error", error: "user Not found" });
      const pet = await this.petsService.getPetById(pid);
      if (!pet) return res.status(404).send({ status: "error", error: "Pet not found" });
      if (pet.adopted) return res.status(400).send({ status: "error", error: "Pet is already adopted" });
      user.pets.push(pet.id);
      await this.usersService.update(user.id, { pets: user.pets });
      await this.petsService.update(pet.id, { adopted: true, owner: user._id });
      await this.adoptionsService.create({ owner: user.id, pet: pet.id });
      res.send({ status: "success", message: "Pet adopted" });
    } catch (error) {
      error.path = "[POST] api/adoptions/:uid/:pid - Class AdoptionsController.createAdoption";
      next(error);
    }
  };
}
