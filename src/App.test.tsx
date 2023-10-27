import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { render, screen } from "@testing-library/react";
import App from "./App";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("should pass, but doesn't", () => {
  server.use(
    http.get("/test", () => {
      return HttpResponse.json(null, {
        status: 500,
      });
    })
  );
});
