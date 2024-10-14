import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoicesUsecase from "../usecase/find-invoices/find-invoices.usecase";
import GenerateInvoiceUsecase from "../usecase/generate-invoices/generate-invoices.usecase";

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const repository = new InvoiceRepository();
    const find = new FindInvoicesUsecase(repository);
    const create = new GenerateInvoiceUsecase(repository);
    const facade = new InvoiceFacade({ create: create, find: find });
    return facade;
  }
}