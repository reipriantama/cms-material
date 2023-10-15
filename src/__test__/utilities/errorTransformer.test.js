import { describe, expect, test } from "@jest/globals";

import { transformError } from "../../utilities/errorTransformer";

describe("ErrorTransformer", () => {
  test("transformError should return default error when error data is empty", () => {
    const actual = transformError(undefined);

    expect(actual.code).toBe(0);
    expect(actual.message).toBe("Unknown");
  });

  test("tranformError should return the sam as error data", () => {
    const dummyCode = 404;
    const dummyMessage = "Data Not Found";
    const dummyError = { code: dummyCode, message: dummyMessage };
    const actual = transformError(dummyError);

    expect(actual.code).toBe(404);
    expect(actual.message).toBe("Data Not Found");
  });
});
