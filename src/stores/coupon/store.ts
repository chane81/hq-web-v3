import { applySnapshot, Instance, SnapshotIn, types } from 'mobx-state-tree';

const IDENTIFIER = 'couponModel';

/**
 * 리뷰 모델
 */
const model = types
  .model(IDENTIFIER, {
    /** 스토어 아이덴티티 */
    identifier: types.optional(types.identifier, IDENTIFIER),
    /** 총 카운트 */
    totalCount: types.optional(types.number, 0),
  })
  .actions((self) => ({
    /** 초기화 */
    setInit() {
      applySnapshot(self, defaultValue);
    },
    /** set 총 카운트 */
    setTotalCount(val: number) {
      self.totalCount = val;
    },
  }));

/** 초기화 값 */
const defaultValue: SnapshotIn<typeof model> = {
  identifier: IDENTIFIER,
  totalCount: 0,
};

/** create or initialize */
const create = model.create(defaultValue);

/** store */
const store = {
  create,
  defaultValue,
  model,
};

/** 모델 타입 */
export type ICouponModelType = Instance<typeof model>;

export default store;
