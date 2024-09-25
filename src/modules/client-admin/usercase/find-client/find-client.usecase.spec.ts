import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUsecase from "./find-client.usecase";

const client = new Client({
  id: new Id("1"),
  name: "Client 1",
  email: "x@x.com",
  address: "Address 1"
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
}

describe("find Client Usecase unit test", () => {
  it("should add a client", async () => {
    const respository = MockRepository();
    const usercase = new FindClientUsecase(respository);

    const input = {
      id: "1",
    };

    const result = await usercase.execute(input);

    expect(respository.find).toHaveBeenCalled();
    expect(result.id).toEqual(result.id);
    expect(result.name).toEqual(result.name);
    expect(result.email).toEqual(result.email);
    expect(result.address).toEqual(result.address);
    expect(result.createdAt).toEqual(result.createdAt);
    expect(result.updatedAt).toEqual(result.updatedAt);
  });
})