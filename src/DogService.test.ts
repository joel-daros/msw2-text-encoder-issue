import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
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
    http.get("*/api/facts", () => {
      console.log("getDogFacts was intercepted by MSW");
      return HttpResponse.json({ facts: ["fact1", "fact2"] });
    })
  );
  // when this line is added, the test stuck and never finishes
  jest.useFakeTimers({
    // now: new Date(2023, 9, 15),
    // doNotFake: ["setTimeout"],
    legacyFakeTimers: true,
  });
  //

  const result = await getDogFacts();
  expect(result).toStrictEqual(["fact1", "fact2"]);
});
