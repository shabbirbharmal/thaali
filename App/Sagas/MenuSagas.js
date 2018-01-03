/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import MenuActions from '../Redux/MenuRedux'
// import { MenuSelectors } from '../Redux/MenuRedux'

export function * getMenu (api, action) {
  const { day } = action
  // get current data from Store
  // const currentData = yield select(MenuSelectors.getData)
  // make the call to the api
  const response = yield call(api.getMenu, day.day, day.month, day.year)
  let matches = response.data.match(/<div\s+id="ctl00_ContentPlaceHolder1_pan1"\s+class="viewmenu">[\S\s]*?<\/div>/gi)
  let menu = 'No menu'
  if(matches.length > 0) {
    menu = matches[0].replace(/<\/?[^>]+(>|$)/g, "")
  }
  const strTime = timeToString(day.timestamp)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(MenuActions.menuSuccess({key: strTime, value: menu}))
  } else {
    //yield put(MenuActions.menuFailure())
  }
}

function timeToString(time) {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}
