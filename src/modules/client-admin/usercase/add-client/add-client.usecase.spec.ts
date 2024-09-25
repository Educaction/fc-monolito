import AddClientUsecase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
}

describe("add Client Usecase unit test", () => {
  it("should add a client", async () => {
    const respository = MockRepository();
    const usercase = new AddClientUsecase(respository);

    const input = {
      // id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    };

    const result = await usercase.execute(input);
    
    expect(respository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.address).toEqual(input.address);
  })
})