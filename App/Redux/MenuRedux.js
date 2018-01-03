import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  menuRequest: ['day'],
  menuSuccess: ['payload'],
  menuFailure: null
})

export const MenuTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  items: [],
  error: null
})

/* ------------- Selectors ------------- */

export const MenuSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true})

// successful api lookup
export const success = (state, action) => {
  let {payload} = action
  const newItems = {...state.items}
  newItems[payload.key] = [{name: payload.value}]
  return state.merge({fetching: false, items: newItems})
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MENU_REQUEST]: request,
  [Types.MENU_SUCCESS]: success,
  [Types.MENU_FAILURE]: failure
})
