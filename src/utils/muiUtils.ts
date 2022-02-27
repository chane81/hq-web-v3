/** material ui 관련 유틸 */

/** TextField 의 maxLength 설정 */
export const maxLengthProps = (maxLength: number) => ({
  onInput: (e) => {
    const ele = e.target;
    ele.value = ele.value.toString().slice(0, maxLength);
  },
});

/** 에러 처리 */
export const setErrorProps = (errors: any, name: string) => ({
  error: !!errors?.[name]?.message,
  helperText: errors?.[name]?.message,
});
