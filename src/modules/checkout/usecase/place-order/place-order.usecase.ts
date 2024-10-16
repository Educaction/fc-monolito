import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-admin/facade/client-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface;

  constructor(clientFacade: ClientAdmFacadeInterface) {
    this._clientFacade = clientFacade;
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {

    const client = await this._clientFacade.find({ id: input.clientId });
    if (!client) {
      throw new Error("Client not found");
    }
    // validar produto
    // recuperar os produtos

    // criar o objeto do client 
    // criar o objeto do order (client, products)

    //processpayment => paymentFacace.proces (orderid, amount)

    // caso pagamento seja aprovado, -> gerar invoice
    // mudar o status do minha order para aproved
    // retornar dto

    return {
      id: "",
      invoiceId: "",
      status: "",
      total: 0,
      products: []
    };
  }
}
