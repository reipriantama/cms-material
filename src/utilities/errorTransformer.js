import { isEmpty } from "lodash";

const transformError = (error) => {
  if (!isEmpty(error)) {
    return {
      code: error.code,
      message: error.message,
    };
  }
  return {
    code: 0,
    message: "Unknown",
  };
};

export { transformError };
