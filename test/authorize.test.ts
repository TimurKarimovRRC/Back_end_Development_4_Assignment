import authorize from "../src/api/v1/middleware/authorize";

function createMockResponse(role?: string, uid?: string) {
  const response: any = {};
  response.locals = {
    role,
    uid
  };
  return response;
}

describe("authorize middleware", () => {
  it("it should return ROLE_NOT_FOUND when user has no role", () => {
    const middleware = authorize({ hasRole: ["admin"] });
    const request: any = {
      params: {}
    };
    const response = createMockResponse(undefined, "uid-123");
    const next = jest.fn();

    middleware(request, response, next);

    expect(next).toHaveBeenCalled();
    const firstCallArgument = next.mock.calls[0][0];
    expect(firstCallArgument.code).toBe("ROLE_NOT_FOUND");
  });

  it("it should return INSUFFICIENT_ROLE when role is not allowed", () => {
    const middleware = authorize({ hasRole: ["admin"] });
    const request: any = {
      params: {}
    };
    const response = createMockResponse("user", "uid-123");
    const next = jest.fn();

    middleware(request, response, next);

    expect(next).toHaveBeenCalled();
    const firstCallArgument = next.mock.calls[0][0];
    expect(firstCallArgument.code).toBe("INSUFFICIENT_ROLE");
  });

  it("it should call next when role is allowed", () => {
    const middleware = authorize({ hasRole: ["manager", "admin"] });
    const request: any = {
      params: {}
    };
    const response = createMockResponse("manager", "uid-123");
    const next = jest.fn();

    middleware(request, response, next);

    expect(next).toHaveBeenCalledWith();
  });

  it("it should allow same user access when allowSameUser is true", () => {
    const middleware = authorize({
      hasRole: ["admin"],
      allowSameUser: true
    });

    const request: any = {
      params: {
        uid: "uid-123"
      }
    };

    const response = createMockResponse("user", "uid-123");
    const next = jest.fn();

    middleware(request, response, next);

    expect(next).toHaveBeenCalledWith();
  });
});