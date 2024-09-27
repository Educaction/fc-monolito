import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUsecase from "./process-payment.usecase";

const transaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved"
});

const MockReposiotry = () => {
  return {
    save: jest.fn().mockResolvedValue(Promise.resolve(transaction)),
  };
};

const transaction2 = new Transaction({
  id: new Id("1"),
  amount: 50,
  orderId: "1",
  status: "declined"
});

const MockReposiotryDeclined = () => {
  return {
    save: jest.fn().mockResolvedValue(Promise.resolve(transaction2)),
  };
};

describe("Process payment usecase unit test", () => {
  it("should approve a transaction", async () => {
    const paymentRepository = MockReposiotry();
    const usecase = new ProcessPaymentUsecase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 50,
    };

    const result = await usecase.execute(input);

    expect(result.transactionId).toBe(transaction.id.id);
    expect(paymentRepository.save).toBeCalled();
    expect(result.amount).toBe(100);
    expect(result.status).toBe("approved");
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toBe(transaction.createdAt);
    expect(result.updatedAt).toBe(transaction.updatedAt);
  });

  it("should decline a transaction", async () => {
    const paymentRepository = MockReposiotryDeclined();
    const usecase = new ProcessPaymentUsecase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 50,
    };

    const result = await usecase.execute(input);
    expect(result.transactionId).toBe(transaction2.id.id);
    expect(paymentRepository.save).toBeCalled();
    expect(result.amount).toBe(50);
    expect(result.status).toBe("declined");
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toBe(transaction2.createdAt);
    expect(result.updatedAt).toBe(transaction2.updatedAt);
  });
});