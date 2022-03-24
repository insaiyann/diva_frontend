const IdentitiesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_IDENTITY':
            return [...state, {
                name: action.details.name,
                aadhar: action.details.aadhar,
                gender: action.details.gender
            }];
        case 'REMOVE_IDENTITY':
            return state.filter((details) => details.aadhar !== action.aadhar)
        default:
            return state;
    }
}

export default IdentitiesReducer;