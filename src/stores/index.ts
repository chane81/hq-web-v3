import { createContext, useContext } from 'react';
import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { enableStaticRendering } from 'mobx-react';
import reviewStore from '~/stores/review/store';
import userStore from '~/stores/user/store';
import couponStore from '~/stores/coupon/store';

let initStore: IStore | undefined = null as any;

/** 서버 여부 true/false */
const isServer = typeof window === 'undefined';

/** mobx ssr 사용시 gc 문제 방지설정 (아래 내용 참고)
 * https://mobx.js.org/react-integration.html#tips
 * Server Side Rendering (SSR)
 * If is used in server side rendering context; make sure to call , so that won't subscribe to any observables used, and no GC problems are introduced
 */
enableStaticRendering(isServer);

/** root store */
const store = types.model('store', {
  /** 스토어 아이덴티티 */
  identifier: types.optional(types.identifier, 'store'),
  /** 리뷰 model */
  reviewModel: types.optional(reviewStore.model, () => reviewStore.create),
  /** 사용자 model */
  userModel: types.optional(userStore.model, () => userStore.create),
  /** 쿠폰 model */
  couponModel: types.optional(couponStore.model, () => couponStore.create),
});

/** default state value */
const defaultValue: IStoreSnapshotIn = {
  reviewModel: { ...reviewStore.defaultValue },
  userModel: { ...userStore.defaultValue },
  couponModel: { ...couponStore.defaultValue },
};

/** 스토어 initialize */
const initializeStore = (snapshot: null | IStoreSnapshotIn = null): IStore => {
  const storeVal = initStore ?? store.create(defaultValue);
  const isServer = typeof window === 'undefined';

  if (snapshot) {
    applySnapshot(storeVal, { ...defaultValue, ...snapshot });
  }

  if (isServer) return storeVal;

  if (!initStore) initStore = storeVal;

  return initStore;
};

/** context api */
const RootStoreContext = createContext<null | IStore>(null);
const StoreProvider = RootStoreContext.Provider;

/** mobx 스토어 hooks */
const useStore = (): IStore => {
  const store = useContext(RootStoreContext);

  if (store === null) {
    throw new Error('Store is null');
  }

  return store;
};

/** store export */
export { initializeStore, useStore, StoreProvider };

/** type export */
export interface IStoreInjectType {
  store: IStore;
}
export type IStore = Instance<typeof store>;
export type IStoreSnapshotIn = SnapshotIn<typeof store>;
export type IStoreSnapshotOut = SnapshotOut<typeof store>;
export type { IReviewModelType } from '~/stores/review/store';
export type { IUserModelType } from '~/stores/user/store';
export type { ICouponModelType } from '~/stores/coupon/store';
