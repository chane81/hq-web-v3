import dayjs from 'dayjs';
import { NextRouter } from 'next/router';

/**
 * 공통 유틸리티성 함수(컨트롤에 의존적이지 않은 공통 함수)
 */

/**
 * 전화번호, 핸드폰형식으로 변환
 * @param val 01099887772
 * @param type 0: **** 으로 표시, 1: 모두 표시
 */
export const convertPhoneText = (
  val: string | number | null | undefined,
  type: 0 | 1,
  defaultValue: string = '',
) => {
  if (!val) return defaultValue;

  const tel = val.toString();

  const getReplaceValue = (middleLength: number) =>
    type === 0 ? `$1-${'*'.repeat(middleLength)}-$3` : '$1-$2-$3';

  if (tel.length === 11)
    return tel.replace(/(\d{3})(\d{4})(\d{4})/, getReplaceValue(4));

  if (tel.length === 7) return tel.replace(/(\d{3})(\d{4})/, '$1-$2');

  if (tel.length === 8) return tel.replace(/(\d{4})(\d{4})/, '$1-$2');

  if (tel.indexOf('02') === 0 && tel.length === 10)
    return tel.replace(/(\d{2})(\d{4})(\d{4})/, getReplaceValue(4));

  if (tel.indexOf('02') === 0 && tel.length === 9)
    return tel.replace(/(\d{2})(\d{3})(\d{4})/, getReplaceValue(3));

  return tel.replace(/(\d{3})(\d{3})(\d{4})/, getReplaceValue(3));
};

/**
 *  날짜값을 fotmat(YYYY-MM-DD 형태) 스트링으로 변경해서 반환
 * @param val 변경할 값
 * @param format  날짜 표시 FORMAT (ex, YYYY-MM-DD)
 */
export const convertDateFormat = (
  val: string | Date | null | undefined,
  format: string = 'YYYY-MM-DD',
  defaultValue: string = '',
) => {
  if (!val) return defaultValue;

  return dayjs(val).format(format);
};

/**
 *  돈표시 천단위 콤마 찍어서 반환
 * @param val 대상값
 */
export const convertMoneyText = (
  val: string | number,
  defaultValue: string = '',
) => {
  if (!val) return defaultValue;

  const moneyVal = typeof val === 'number' ? val.toString() : val;

  return moneyVal.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 쿼리 파라메터 값 가져오기
 * @param router next router
 */
export const getQueryParm =
  (router: NextRouter) =>
  (field: string, defaultValue: string | number = '') =>
    router.query[field]?.toString().toUpperCase() || defaultValue;

/**
 * Object value가 true인 key만
 */
export const getSelectedBrandList = (obj: Object, list, targetKey: string) => {
  // true인 값만 추출
  const checkedBrandsList = Object.keys(obj).filter((key) => obj[key] === true);

  let result;

  if (checkedBrandsList.includes('All')) {
    // 전체 선택인 경우 모든 브랜드 index 넣어야함
    result = list.map((item) => item[targetKey]);
  } else {
    result = list
      .filter((item) => checkedBrandsList.includes(item.brand_name))
      .map((el) => el[targetKey]);
  }
  return result;
};

/** 기본 default val 반환 */
export const getVal = (
  val: string | number | null | undefined,
  defaultValue: string | number = '',
) => {
  if (!val) return defaultValue;

  return val;
};

/** 클라이언트측 호출인지 여부(true) 반환 */
export const isClient = () => typeof window !== 'undefined';

/** url 을 file blob 형태로 변형 */
export const urlToFileObj = async (url: string, type: string = 'image') => {
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split('.').pop(); // url 구조에 맞게 수정할 것
  const filename = url.split('/').pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `${type}/${ext}` };

  return new File([data], filename!, metadata);
};

/** falsy 일 경우 기본값 반환 */
export const toDefault = (val: any, defaultValue: any = '') => {
  if (!val) {
    return defaultValue;
  }

  return val;
};

/** 중복 방지를 위해 사용하는 unique number */
export const getUniqueNumber = () => new Date().getTime();
