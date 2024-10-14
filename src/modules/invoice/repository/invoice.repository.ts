import { InvoiceModel } from './invoice.model';
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceItemModel from './invoice.item.model';
import Address from '../../@shared/domain/value-object/address.value-object';
import InvoiceGateway from '../gateway/invoices.gateway';
import InvoiceItems from '../domain/invoice-items';


export default class InvoiceRepository implements InvoiceGateway {
  async generate(input: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: input.id.id,
      name: input.name,
      document: input.document,
      street: input.address.street,
      number: input.address.number,
      complement: input.address.complement,
      city: input.address.city,
      state: input.address.state,
      zipCode: input.address.zipCode,
      items: input.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: input.total(),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }, {
      include: [InvoiceItemModel]
    }
    );
  }

  async find(id: string): Promise<Invoice> {
    const result = await InvoiceModel.findOne({ where: { id }, include: [InvoiceItemModel] });
    return new Invoice({
      id: new Id(result.id),
      name: result.name,
      document: result.document,
      address: new Address({
        street: result.street,
        number: result.number,
        complement: result.complement,
        city: result.city,
        state: result.state,
        zipCode: result.zipCode,
      }),
      items: result.items.map((item) => new InvoiceItems({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      })),
      createdAt: result.createdAt,
    });
  }
}