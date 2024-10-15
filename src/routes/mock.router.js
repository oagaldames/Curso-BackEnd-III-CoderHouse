import { Router } from "express";
import { MockControllers } from "../controllers/mocks.controller.js";

const router = Router();
const mockController = new MockControllers();

router.get("/mockingpets",mockController.mockingPets);
router.get("/mockingusers",mockController.mockingUsers);
router.get("/generateData/:cu/:cp",mockController.generateData);


export default router;
