import { Reducer } from 'redux';
import { Subscription } from 'dva';

import { Effect } from './connect.d';
// import { NoticeIconData } from '@/components/NoticeIcon';
import { queryNotices } from '@/services/user';

// export interface NoticeItem extends NoticeIconData {
//   id: string;
//   type: string;
//   status: string;
// }

export interface GlobalModelState {
  collapsed: boolean;
  // notices: NoticeItem[];
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchNotices: Effect;
    clearNotices: Effect;
    changeNoticeReadState: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    saveNotices: Reducer<GlobalModelState>;
    saveClearedNotices: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    // notices: [],
  },

  effects: {
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      // const unreadCount: number = yield select(
        // state => state.global.notices.filter(item => !item.read).length,
      // );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount: 0,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count: number = yield select(state => 0);
      // const unreadCount: number = yield select(
      //   state => state.global.notices.filter(item => !item.read).length,
      // );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount: 0,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      // const notices: NoticeItem[] = yield select(state =>
      //   state.global.notices.map(item => {
      //     const notice = { ...item };
      //     if (notice.id === payload) {
      //       notice.read = true;
      //     }
      //     return notice;
      //   }),
      // );

      yield put({
        type: 'saveNotices',
        payload: [],
      });

      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: 0,
          unreadCount: 0,
        },
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state = { collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        // notices: payload,
      };
    },
    saveClearedNotices(state = { collapsed: true }, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        // notices: state.notices.filter((item): boolean => item.type !== payload),
      };
    },
  },

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      // @ts-ignore
      history.listen(({ pathname, search }): void => {
        // @ts-ignore
        if (typeof window.ga !== 'undefined') {
          // @ts-ignore
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
