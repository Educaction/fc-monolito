import Order from "../domain/order.entity";

export default interface CheckoutGatewat {
  addOrder(order: Order): Promise<void>;
  findOrder(id: string): Promise<void> | null;
}
