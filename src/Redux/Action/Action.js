export const form = (action) => {
  debugger;
  return {
    type: "FORM",
    payload: action.payload,
  };
};
export const removeData = (action) => {
  return {
    type: "REMOVEDATA",
    payload: action.payload,
  };
};
