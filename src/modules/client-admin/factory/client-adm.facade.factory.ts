import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.respository"
import AddClientUsecase from "../usercase/add-client/add-client.usecase";
import FindClientUsecase from "../usercase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
  static create() {
    const repository = new ClientRepository();
    const addUsecase = new AddClientUsecase(repository);
    const findUsecase = new FindClientUsecase(repository);
    const facade = new ClientAdmFacade({
      addUsecase: addUsecase,
      findUsecase: findUsecase,
    });


    return facade;
   
  }
}


