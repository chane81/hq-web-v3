// 이메일 : 아이디에 -_. 포함
export const emailRegex =
  /^[0-9a-zA-Z]([-_.]?[-_0-9a-zA-Z-_.])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*/i; // 아이디 -_. 포함

// 비밀번호 : 한글, 영어 대소문자 및 특수문자 가능, 8-32자
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/;

// 한글 포함
export const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

// 휴대전화 : 숫자만 입력 가능 하게
export const phoneRegex = /^[0-9]{0,13}$/g;
