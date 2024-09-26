import { ClientModel } from './../repository/client.model';
import { Sequelize } from "sequelize-typescript";
import ClientRepository from "../repository/client.respository";
import AddClientUsecase from "../usercase/add-client/add-client.usecase";
import ClientAdmFacade from './client-adm.facade';
import FindClientUsecase from '../usercase/find-client/find-client.usecase';
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory';

describe("ClientAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([ClientModel])
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const repository = new ClientRepository();
    const addUsecase = new AddClientUsecase(repository);
    const facade = new ClientAdmFacade({
      addUsecase: addUsecase,
      findUsecase: undefined
    });

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    }

    await facade.add(input)

    const client = await ClientModel.findOne({ where: { id: "1" } });
    expect(client).toBeDefined();
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
  });

  it("should find a client", async () => {
    const repository = new ClientRepository();
    const addUsecase = new AddClientUsecase(repository);    
    const findUsecase = new FindClientUsecase(repository);
    const facade = new ClientAdmFacade({
      addUsecase: addUsecase,
      findUsecase: findUsecase
    })

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    }

    await facade.add(input)

    const client = await facade.find({ id: "1" });

    expect(client).toBeDefined();
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
  });
})