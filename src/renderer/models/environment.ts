import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryEnvironmentList, saveEnvironment } from "@/services/environment";
import { settingStorage } from '@@/storage';

export interface Environment {
  _id?: string;
  value?: string;
  label?: string;
}

export interface EnvironmentModelState {
  environments?: Environment[];
}

export interface EnvironmentModelType {
  namespace: 'environment';
  state: EnvironmentModelState;
  effects: {
    fetchEnvironmentList: Effect;
    saveEnvironment: Effect;
    saveEnvironmentList: Effect;
    saveEndpoint: Effect;
  };
  reducers: {
    setEnvironmentList: Reducer<EnvironmentModelState>;
  };
}

const EnvironmentModel: EnvironmentModelType = {
  namespace: 'environment',

  state: {
    environments: [],
  },

  effects: {
    * fetchEnvironmentList(_, { call, put }) {
      const response = yield call(queryEnvironmentList);
      const endpoint = yield settingStorage.getApiEndpoint();
      console.log(endpoint);
      yield put({
        type: 'setEnvironmentList',
        payload: [{
          label: '服务地址',
          value: endpoint,
          __v: 0,
          _id: 'endpoint'
        }].concat(response.data),
      });
    },
    * saveEnvironment(action, { call, put }) {
      yield call(saveEnvironment, action.payload);
    },
    * saveEnvironmentList(action, { put }) {
      yield put({
        type: 'setEnvironmentList',
        payload: action.payload,
      });
    },
    * saveEndpoint(action, { put }) {
      console.log(action);
      // yield put({
      //   type: 'setEnvironmentList',
      //   payload: action.payload,
      // });
      yield settingStorage.setApiEndpoint(action.payload.value);
    }
  },

  reducers: {
    setEnvironmentList(state, action) {
      return {
        ...state,
        environments: action.payload,
      };
    },
  },
};

export default EnvironmentModel;
