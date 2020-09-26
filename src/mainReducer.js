import userfields from "./dto";

const initialState = () => userfields;

const mainReducer = (state = initialState(), action) => {
    switch (action.type) {
        case "email": {
            return updateValueandReturnSate(state, action, "email")
        }
    }
    const updateValueandReturnSate = (currentstate, action, fieldToUpdate) => ({
        ...currentstate,
        [fieldToUpdate]: {
            ...currentstate[fieldToUpdate],
            value: action.payload,
        }
    })
}
export default mainReducer;