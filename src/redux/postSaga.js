import { takeEvery, put } from "redux-saga/effects";
import { POST } from "./types";

function* getPosts() {
  let response = yield fetch("https://jsonplaceholder.typicode.com/posts");
  response = yield response.json();
  yield put({ type: POST.GET_POSTS, payload: response });
}

function* postSaga() {
  yield takeEvery(POST.POSTS, getPosts);
}

export default postSaga;
