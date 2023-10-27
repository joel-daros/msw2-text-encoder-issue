import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { getDogFacts } from "./DogService";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("returns the dog facts", async () => {
  server.use(
    http.get("/api/facts", () => {
      return HttpResponse.json(
        {
          facts: ["fact1", "fact2"],
        },
        { status: 200 }
      );
    })
  );
  const result = await getDogFacts();
  expect(result).toStrictEqual(["fact1", "fact2"]);
});
