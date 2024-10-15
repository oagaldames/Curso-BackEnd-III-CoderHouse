import Users from "../dao/Users.dao.js";
import Pets from "../dao/Pets.dao.js";

import { generateUsersMock } from "../mocks/user.mock.js";
import { generatePetsMock } from "../mocks/pets.mock.js";

export class MocksServices {
  constructor() {
    this.userDao = new Users();
    this.petDao = new Pets();
  }
  async createPetsMocks(cp) {
    const pets = generatePetsMock(cp);
    const petsDb = await this.petDao.saveMany(pets);
    return petsDb;
  }

  async createUsersMocks(cu) {
    const users = await generateUsersMock(cu);
    const usersDb = await this.userDao.saveMany(users);
    return usersDb;
  }

}