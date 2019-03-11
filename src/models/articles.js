import { createArticle } from '@/services/api';

export default {
  namespace: 'articles',

  state: {},

  effects: {
    *submit({ payload }, { call, put }) {
      // let callback;
      // if (payload.id) {
      //   callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      // } else {
      //   callback = addFakeList;
      // }
      const response = yield call(createArticle, payload); // post
      yield put({
        type: 'createSucess',
        payload: response,
      });
    },
  },

  reducers: {
    createSucess(state, action) {
      return {
        ...state,
        successInfo: action.payload,
      };
    },
  },
};
