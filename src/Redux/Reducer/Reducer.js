const initialState = [];
let n = 0;
const id = () => {
  return ++n;
};
export const reduxCrud = (state = initialState, action) => {
  debugger;
  console.log("🚀 ~ file: Reducer.js:3 ~ reduxCrud ~ state", state);
  switch (action.type) {
    case "FORM":
      return [
        ...state,
        {
          Id: id(),
          FirstName: action.payload.FirstName,
          LastName: action.payload.LastName,
          Gender: action.payload.Gender,
          Hobby: [action.payload.Hobby],
          Semester: action.payload.Semester,
          Password: action.payload.Password,
          ConfirmPassword: action.payload.ConfirmPassword,
        },
      ];
    case "REMOVEDATA":
      return action.payload;
    default:
      return state;
  }
};
