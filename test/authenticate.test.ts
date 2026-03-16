import authenticate from "../src/api/v1/middleware/authenticate";

jest.mock("../src/config/firebaseConfig", () => ({
  auth: { verifyIdToken: jest.fn() },
}));

import { auth } from "../src/config/firebaseConfig";

function createMockResponse() {
  const response: any = {};
  response.locals = {};
  response.status = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
}

describe("authenticate middleware", () => {
  it("should return TOKEN_NOT_FOUND when no token is provided", async () => {
    const request: any = { headers: {} };
    const response = createMockResponse();
    const next = jest.fn();

    await authenticate(request, response, next);

    expect(next).toHaveBeenCalled();
    const firstCallArgument = next.mock.calls[0][0];
    expect(firstCallArgument.code).toBe("TOKEN_NOT_FOUND");
  });

  it("should return TOKEN_INVALID when token verification fails", async () => {
    (auth.verifyIdToken as jest.Mock).mockRejectedValue(
      new Error("bad token")
    );

    const request: any = {
      headers: { authorization: "Bearer invalid-token" },
    };
    const response = createMockResponse();
    const next = jest.fn();

    await authenticate(request, response, next);

    expect(next).toHaveBeenCalled();
    const firstCallArgument = next.mock.calls[0][0];
    expect(firstCallArgument.code).toBe("TOKEN_INVALID");
  });

  it("should store uid in res.locals when token is valid", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({
      uid: "uid-123",
      email: "user@example.com",
      role: "user",
    });

    const request: any = {
      headers: { authorization: "Bearer valid-token" },
    };
    const response = createMockResponse();
    const next = jest.fn();

    await authenticate(request, response, next);

    expect(response.locals.uid).toBe("uid-123");
    expect(next).toHaveBeenCalledWith();
  });

  it("should store role in res.locals when token is valid", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({
      uid: "uid-123",
      email: "manager@pixell-river.com",
      role: "manager",
    });

    const request: any = {
      headers: { authorization: "Bearer valid-token" },
    };
    const response = createMockResponse();
    const next = jest.fn();

    await authenticate(request, response, next);

    expect(response.locals.role).toBe("manager");
    expect(next).toHaveBeenCalledWith();
  });
});