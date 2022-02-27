import * as Yup from 'yup';

/** 숫자 체크 */
export const yupNumber = Yup.number()
  .nullable(true)
  .transform((v, o) => (o === '' ? null : v));
