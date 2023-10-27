import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { getDogFacts } from "./DogService";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

server.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url);
});

it("returns the dog facts", async () => {
  server.use(
    http.get("/api/facts", () => {
      console.log("getDogFacts was intercepted by MSW");
      return HttpResponse.json(["fact1", "fact2"], { status: 200 });
    })
  );
  const result = await getDogFacts();
  expect(result).toStrictEqual(["fact1", "fact2"]);
});
