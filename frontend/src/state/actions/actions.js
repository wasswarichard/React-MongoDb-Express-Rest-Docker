import * as actions from "../actionTypes/actionTypes";
export const AddBlocks = description => ({
    type: actions.BLOCKS_LOADED,
    payload : description
})

export const addBlockDetails = description => ({
    type: actions.BLOCK_DETAILS_LOADED,
    payload: description
})

export const addBlockTransactions = description => ({
    type: actions.BLOCK_TRANSACTIONS_LOADED,
    payload: description
})