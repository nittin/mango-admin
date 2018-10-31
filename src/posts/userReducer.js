import { USER_CLEAR_STATE, USER_CHANGE_CURRENT_DATA } from './userActions';

const initState = {
    currentUser: {
        code: '',
        description: '',
        name: '',
        id: null,
    },
};

export default (state = initState, action) => {
    switch (action.type) {
        case USER_CHANGE_CURRENT_DATA:
            return {
                ...state,
                currentUser: action.payload,
            };
        case USER_CLEAR_STATE:
            return {
                currentUser: {
                    code: '',
                    description: '',
                    name: '',
                    id: null,
                },
            };
        default:
            return state;
    }
};
