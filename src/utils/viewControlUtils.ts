/**
 * 뷰단에서 쓰이고 있는 컨트롤들에 대한 핼퍼 유틸리티를 제공
 */

/**
 * 검색영역에서 전체 체크박스 클릭시 다른 필드 값 전체를 채워서 return
 * @param data 대상 데이터
 * @param isCheck 체크 true/false
 * @param omitFields 전체 체크 액션에서 제외할 필드 ex) ['txtSch', 'txtName']
 * @returns T
 */
export const chkAll = <T extends Record<string, any>>(
  data: T,
  isCheck: boolean,
  omitFields?: Array<keyof T>,
): T =>
  Object.entries(data).reduce<T>((acc, [field, val]) => {
    if (!omitFields?.includes(field)) {
      return { ...acc, [field]: isCheck };
    }

    return acc;
  }, {} as T);

/** 체크 필드 가져오기 */
export const getChkFields = <T extends Record<string, any>>(
  data: T,
  omitFields?: Array<keyof T>,
): string[] => {
  return Object.keys(data).reduce<string[]>((acc, key) => {
    if (!omitFields?.includes(key)) {
      return [...acc, key];
    }
    return acc;
  }, []);
};
