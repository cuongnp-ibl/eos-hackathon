import { createAction } from 'redux-actions'
import { MODULE_NAME } from './model'

// Update product detail info
export const getDonationHistory = createAction(`${MODULE_NAME}_donationHistory`)
export const getTokenStatus = createAction(`${MODULE_NAME}_getTokenStatus`)
