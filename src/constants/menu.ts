export interface IMenu {
  title: string;
  url: string;
}

export const MENUS: IMenu[] = [
  {
    title: '기업정보',
    url: '/company',
  },
  {
    title: '서비스정보',
    url: '/service',
  },
  {
    title: '사용자정보',
    url: '/user',
  },
  {
    title: '리뷰정보',
    url: '/review',
  },
  {
    title: '쿠폰정보',
    url: '/coupon',
  },
  {
    title: '공지사항',
    url: '/noti',
  },
];
