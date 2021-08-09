import * as actions from "../actionTypes/actionTypes";
export default function reducer(state = [], action) {
    switch (action.type) {
        case actions.BLOCKS_LOADED:
            const blocks = action.payload
            return {
                ...state,
                blocks: blocks
            }
        case actions.BLOCK_DETAILS_LOADED:
            const details = action.payload
            return {
                ...state,
                blockDetails: details
            }
        case actions.BLOCK_TRANSACTIONS_LOADED:
            const transactions = action.payload
            return {
                ...state,
                blockTransactions : transactions
            }
        default:
            return state;
    }
}

