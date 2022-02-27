import { SnapshotIn } from 'mobx-state-tree';

// model field type
export type FieldType<T, U = never> = Omit<
  SnapshotIn<T>,
  'identifier' | '!!types' | ('$treenode' & U)
>;

// model field type 을 enum type 으로 변환한 타입
export type FieldEnumType<T, U = never> = Exclude<keyof FieldType<T>, U>;
