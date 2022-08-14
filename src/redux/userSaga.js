import { takeEvery, put } from "redux-saga/effects";
import { USER } from "./types";

function* getUsers() {
  let response = yield fetch("https://jsonplaceholder.typicode.com/users");
  response = yield response.json();
  yield put({ type: USER.GET_USERS, payload: response });
}

function* userSaga() {
  yield takeEvery(USER.USERS, getUsers);
}

export default userSaga;
