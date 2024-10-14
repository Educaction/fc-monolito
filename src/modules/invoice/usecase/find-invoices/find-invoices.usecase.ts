import Address from "../../../@shared/domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoices.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoices.usecase.dto";

export default class FindInvoicesUsecase {
  private _invoicesRepositoy: InvoiceGateway;

  constructor(invoicesRepositoy: InvoiceGateway) {
    this._invoicesRepositoy = invoicesRepositoy;
  }

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this._invoicesRepositoy.find(input.id);

    const addressProps = {
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
    };
    const address = new Address(addressProps);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: address,
      items: invoice.items.map(item => ({ id: item.id.id, name: item.name, price: item.price })),
      total: invoice.total(),
      createdAt: invoice.createdAt,
    }
  }

}