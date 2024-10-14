import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-items";
import Invoice from "../../domain/invoice.entity";
import FindInvoicesUsecase from "./find-invoices.usecase";

const address = new Address({
  street: "Street",
  number: 123,
  complement: "N/A",
  city: "City",
  state: "State",
  zipCode: "zipCode",
})
const invoiceItem = new InvoiceItems({
  id: new Id("1"),
  name: "Item 1",
  price: 10,

})
const invoice = new Invoice({
  id: new Id("1"),
  name: "Client 1",
  document: "123",
  address: address,
  items: [invoiceItem],
})

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
}

describe("find Invoice Usecase unit test", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoicesUsecase(repository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.address.state).toEqual(invoice.address.state);
    expect(result.address.number).toEqual(invoice.address.number);
    expect(result.address.complement).toEqual(invoice.address.complement);
    expect(result.address.state).toEqual(invoice.address.state);
    expect(result.address.zipCode).toEqual(invoice.address.zipCode);
    expect(result.items[0].id).toEqual(invoice.items[0].id.id);
    expect(result.items[0].name).toEqual(invoice.items[0].name);
    expect(result.items[0].price).toEqual(invoice.items[0].price);
  });
});