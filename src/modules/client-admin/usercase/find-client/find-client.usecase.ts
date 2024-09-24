import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client-entity";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientUseCaseInputDto, FindClientUseCaseOutputDto } from "./find-client.usecase.dto";

export default class FindClientUsecase {
  private _clientRepositoy: ClientGateway;

  constructor(clientRepository: ClientGateway) {
    this._clientRepositoy = clientRepository;

  }

  async execute(input: FindClientUseCaseInputDto): Promise<FindClientUseCaseOutputDto> {
    const client = await this._clientRepositoy.find(input.id);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    }
  }
}