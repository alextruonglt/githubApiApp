import { SET_ALERT, REMOVE_ALERT } from "../types";

const alertReducer = (_, action) => {
    switch (action.type) {
        case SET_ALERT:
            return action.payload;
        case REMOVE_ALERT:
            return null;
        default:
            return SVGPatternElement;
    }
};

export default alertReducer;