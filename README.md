# StockTransactionSimulator
Raw Node.js app

N-layers

database
 - a file which will store all application data


src -all source code
  -entities - object mapping
  -factories - instance generators
  -repositories - data access
  -routes - endpoint mapping
  -services - communication between the routes and repositories layer (business logic)
  -utils - shared code
  -handler - communication between routes and servers layer (presentation logic)
  -index - server instance

  tests -> all automated test suites
  - integration tests - testing on the user point of view. It's also and E2E test because there is no app consuming the API.

  - unit tests
    all tests that must run without any external connections such as database, external APIs, and on our case, the file system.
