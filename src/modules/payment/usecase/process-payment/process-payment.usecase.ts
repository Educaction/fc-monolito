import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";
import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import PaymentGateway from "../../gateway/payment.gateway";
import Transaction from "../../domain/transaction";

export default class ProcessPaymentUsecase implements UseCaseInterface {
  constructor(
    private transactionRepository: PaymentGateway) { }

  async execute(input:
    ProcessPaymentInputDto
  ): Promise<ProcessPaymentOutputDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });

    transaction.process();

    const persistTransacion = await this.transactionRepository.save(
      transaction
    );

    return {
      transactionId: persistTransacion.id.id,
      orderId: persistTransacion.orderId,
      amount: persistTransacion.amount,
      status: persistTransacion.status,
      createdAt: persistTransacion.createdAt,
      updatedAt: persistTransacion.updatedAt,
    };
  }
}
