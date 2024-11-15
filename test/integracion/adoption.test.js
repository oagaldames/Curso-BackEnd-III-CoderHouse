import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/adoptions");

describe("Test de integración para el endpoint /api/adoptions", () => {
  it("[GET] /api/adoptions - Debe devolver un array de adopciones", async () => {
    const { status, body } = await request.get("/");
    expect(status).to.be.equal(200, "El estado HTTP debe ser 200");
    expect(body).to.have.property("status", "success", "La respuesta debe tener el estado 'success'");
    expect(body.payload).to.be.an("array", "El payload debe ser un array");
  });
});

describe("Test de integración para el endpoint /api/adoptions/:aid", () => { 
  it("[GET] /api/adoptions/:aid - Debe devolver una adopción con un ID válido", async () => {
    const ExistentId = "67374abc1eeb450a3e46257d"; // Un ID de MongoDB que existe
    const { status, body } = await request.get(`/${ExistentId}`); // Un ID de MongoDB que existe
    expect(status).to.be.equal(200, "El estado HTTP debe ser 200");
    expect(body).to.have.property("status", "success", "La respuesta debe tener el estado 'success'");
    expect(body.payload).to.be.an("object", "El payload debe ser un objeto");
    expect(body.payload).to.have.property("_id", ExistentId, "El ID devuelto debe coincidir con el solicitado");
  });

  it("[GET] /api/adoptions/:aid - Debe devolver un error 404 para un ID no existente", async () => {
    const nonExistentId = "67374abc1eeb450a3e46157d"; // Un ID de MongoDB que no existe
    const { status, body } = await request.get(`/${nonExistentId}`);

    expect(status).to.be.equal(404, "El estado HTTP debe ser 404 para un ID no encontrado");
    expect(body).to.have.property("status", "error", "La respuesta debe tener el estado 'error'");
    expect(body).to.have.property("error", "Adoption not found", "El mensaje de error debe ser 'Adoption not found'");
  });

  it("[GET] /api/adoptions/:aid - Debe devolver un error 400 para un formato de ID no existente", async () => {
    const invalidId = "invalid-id"; // Un ID no válido
    const { status, body } = await request.get(`/${invalidId}`);

    expect(status).to.be.equal(400, "El estado HTTP debe ser 400 para un formato de ID inválido");
    expect(body).to.have.property("status", "error", "La respuesta debe tener el estado 'error'");
    expect(body).to.have.property("error", "Invalid Adoption ID format", "El mensaje de error debe ser 'Invalid Adoption ID format'");
  });
});

describe("Test de integración para el endpoint POST /api/adoptions/:uid/:pid", () => {
  const validUserId="670d7e01d0dcfc49f700b7f4"; //Un ID User de MongoDB que existe
  const validPetId="670d77c35bac27ee3052ac59"; //Un ID Pet de MongoDB que existe.Poner un ID Pet que no se encuentre adoptado
  const invalidUserId="670d7e01d0dcfc49f700b8fe"; //Un ID User de MongoDB que no existe
  const invalidPetId="670d77c35bac28ee3052ac47"; //Un ID Pet de MongoDB que no existe
  
  let adoptedPetId;
  it("[POST] /api/adoptions/:uid/:pid - Debe adoptar una mascota que no haya sido adoptada previamente", async () => {
    const { status, body } = await request.post(`/${validUserId}/${validPetId}`);
    expect(status).to.be.equal(200);
    expect(body).to.have.property("status", "success");
    expect(body).to.have.property("message", "Pet adopted");
  });

  it("[POST] /api/adoptions/:uid/:pid - Debe devolver un error 400 si el ID de usuario tiene un formato inválido", async () => {
    const { status, body } = await request.post(`/invalidFormatUserId/${validPetId}`);
    expect(status).to.be.equal(400,"El estado HTTP debe ser 400 para un formato de ID de usuario inválido");
    expect(body).to.have.property("status", "error");
    expect(body).to.have.property("error", "Invalid User ID format");
  });

  it("[POST] /api/adoptions/:uid/:pid - Debe devolver un error 400 si el ID de mascota tiene un formato inválido", async () => {
    const { status, body } = await request.post(`/${validUserId}/invalidFormatPetId}`);
    expect(status).to.be.equal(400,"El estado HTTP debe ser 400 para un formato de ID de mascota inválido");
    expect(body).to.have.property("status", "error");
    expect(body).to.have.property("error", "Invalid Pet ID format");
  });

  it("[POST] /api/adoptions/:uid/:pid - Debe devolver un error 404 si el usuario no existe", async () => {
    const { status, body } = await request.post(`/${invalidUserId}/${validPetId}`);
    expect(status).to.be.equal(404);
    expect(body).to.have.property("status", "error");
    expect(body).to.have.property("error", "user Not found");
    
  });

  it("[POST] /api/adoptions/:uid/:pid - Debe devolver un error 404 si la mascota no existe", async () => {
    const { status, body } = await request.post(`/${validUserId}/${invalidPetId}`);
    expect(status).to.be.equal(404);
    expect(body).to.have.property("status", "error");
    expect(body).to.have.property("error", "Pet not found");
  });

  it("[POST] /api/adoptions/:uid/:pid - Debe devolver un error 400 si la mascota ya está adoptada", async () => {
    const { status, body } = await request.post(`/${validUserId}/${validPetId}`);
    expect(status).to.be.equal(400);
    expect(body).to.have.property("status", "error");
    expect(body).to.have.property("error", "Pet is already adopted");
  });

  
});
  