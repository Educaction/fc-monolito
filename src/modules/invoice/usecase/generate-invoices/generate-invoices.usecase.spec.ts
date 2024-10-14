import GenerateInvoiceUsecase from "./generate-invoices.usecase";
import InvoiceItems from "../../domain/invoice-items";
import Id from "../../../@shared/domain/value-object/id.value-object";

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};


describe("Gnerate Invoice usecase unit test", () => {
  it("should generate a invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUsecase(repository);

    const invoiceItem = new InvoiceItems({
      id: new Id("1"),
      name: "Item 1",
      price: 10,
    })

    const input = {
      name: "Invoice 1",
      document: "123456789",
      street: "street 1",
      number: 123,
      complement: "N/A",
      city: "City",
      state: "State",
      zipCode: "Zip Code",
      items: [{
        id: invoiceItem.id.id,
        name: invoiceItem.name,
        price: invoiceItem.price,
      }],
    }

    const result = await usecase.execute(input);


    expect(repository.generate).toHaveBeenCalled();
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.complement).toEqual(input.complement);
    expect(result.city).toEqual(input.city);
    expect(result.state).toEqual(input.state);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.items[0].id).toEqual(input.items[0].id);
    expect(result.items[0].name).toEqual(input.items[0].name);
    expect(result.items[0].price).toEqual(input.items[0].price);
  });
})