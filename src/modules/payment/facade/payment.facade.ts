import ProcessPaymentUsecase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface";


export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private processPaymentUseCase: ProcessPaymentUsecase) {}

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.processPaymentUseCase.execute(input);
  }
}