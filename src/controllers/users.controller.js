import { UserServices } from "../services/user.services.js";

export class UserControllers {
  constructor() {
    this.userServices = new UserServices();
  }

  createUserMock = async (req, res, next) => {
    try {
      const users = await this.userServices.createMocks();

      res.status(201).json({ status: "ok", users });
    } catch (error) {
      error.path = "[GET] api/users/mock - Class UserControllers.createUserMock";
      next(error);
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userServices.getAll();
      res.send({ status: "success", payload: users });
    } catch (error) {
      error.path = "[GET] api/users - Class UserControllers.getAllUsers";
      next(error);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const userId = req.params.uid;
      const user = await this.userServices.getById(userId);
      res.send({ status: "success", payload: user });
    } catch (error) {
      error.path = "[GET] api/users/:uid - Class UserControllers.getUser";
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const updateBody = req.body;
      const userId = req.params.uid;
      const user = await this.userServices.getById(userId);
      if (!user) return res.status(404).send({ status: "error", error: "User not found" });
      const result = await this.userServices.update(userId, updateBody);
      res.send({ status: "success", message: "User updated" });
    } catch (error) {
      error.path = "[PUT] api/users/:uid - Class UserControllers.updateUser";
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.uid;
      const user = await this.userServices.getById(userId);
      if (!user) return res.status(404).send({ status: "error", error: "User not found" });
      const result = await this.userServices.remove(userId);
      res.send({ status: "success", message: "User deleted" });
    } catch (error) {
      error.path = "[DELETE] api/users/:uid - Class UserControllers.deleteUser";
      next(error);
    }
  };
}
