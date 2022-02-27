import { FC, useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import Button from '@mui/material/Button';
import { BaseContainer } from '~/components/share/BaseContainer';
import { withLayout } from '~/src/utils/withLayout';
import { BasicCard } from '~/components/card/BasicCard';
import { useRouter } from 'next/router';
import {
  TQueryKey,
  useMutationApi,
  useQueryApi,
  useQueryClient,
} from '~/hooks/useQueryApi';
import Write, {
  IForm as IFormWrite,
  IRef as IRefWrite,
} from '~/views/noti/save/Write';
import { GetServerSideProps } from 'next';
import {
  IReqGetNotiDetail,
  IResGetNotiDetail,
} from '~/types/apis/noti/get.notiDetail';
import { API_NOTI } from '~/constants/apis/noti';
import {
  IReqPostNotiInsert,
  IResPostNotiInsert,
} from '~/types/apis/noti/set.notiInsert';
import {
  IReqPostNotiModify,
  IResPostNotiModify,
} from '~/types/apis/noti/set.notiModify';
import { IResBase } from '~/types/apis/base';
import { ToastMsg } from '~/components/message/ToastMsg';
import { toast } from 'react-toastify';

/** style */
const Container = styled(BaseContainer)`
  ${tw`flex justify-center`}
`;

/** props */
interface IProps {
  id?: number;
  pageNo?: number;
}

/** component: 공지 정보 등록/수정 */
const Save: FC<IProps> = ({ id, pageNo }) => {
  const router = useRouter();
  const refWrite = useRef<IRefWrite>(null);
  const isModify = !!id;
  const queryClient = useQueryClient();

  // api call - 공지 상세
  const detailQueryKey: TQueryKey<IReqGetNotiDetail> = [
    API_NOTI.GET_DETAIL,
    {
      BOARD_ID: id || 0,
    },
  ];

  // api call - 공지 상세
  const {
    data: detailData,
    refetch: detailRefetch,
    isFetching: isDetailDataFetching,
  } = useQueryApi<IResGetNotiDetail, IReqGetNotiDetail>(detailQueryKey, {
    queryConfig: {
      enabled: !!id,
    },
  });

  // api call - 공지 등록
  const { mutateAsync: insertMutate } = useMutationApi<
    IResPostNotiInsert,
    IReqPostNotiInsert
  >({
    axiosConfig: {
      method: 'POST',
    },
  });

  // api call - 공지 수정
  const { mutateAsync: modifyMutate } = useMutationApi<
    IResPostNotiModify,
    IReqPostNotiModify
  >({
    axiosConfig: {
      method: 'POST',
    },
  });

  // 리스트로 이동
  const listGo = () => router.push(`/noti?pageNo=${pageNo}`);

  // 서비스정보 등록 및 수정
  const handleSubmit = async (data: IFormWrite) => {
    let res: IResBase | undefined;

    if (isModify) {
      res = await modifyMutate({
        url: API_NOTI.SET_MODIFY,
        body: {
          BOARD_ID: id,
          TITLE: data.title,
          SHORT_DESC: data.shortDesc,
          CONTENTS: data.contents,
          URL_1: data.url1,
          URL_2: data.url2,
          URL_3: data.url3,
          USE_YN: data.useYn,
        },
      });
    } else {
      res = await insertMutate({
        url: API_NOTI.SET_INSERT,
        body: {
          TITLE: data.title,
          SHORT_DESC: data.shortDesc,
          CONTENTS: data.contents,
          URL_1: data.url1,
          URL_2: data.url2,
          URL_3: data.url3,
          USE_YN: data.useYn,
        },
      });
    }

    const msgGubun = isModify ? '수정' : '등록';
    if (res?.RESULT) {
      toast.info(`${msgGubun}이 완료 되었습니다.`);

      // 데이터 등록/수정 후 상세 api react-query cache 무효화
      queryClient.invalidateQueries(detailQueryKey);

      listGo();
    } else {
      toast.error(
        <ToastMsg msg={`${msgGubun}이 실패 되었습니다.`} result={res} />,
      );
    }
  };

  // 등록 및 수정 취소 클릭시
  const handleCancel = async () => {
    await detailRefetch();
  };

  // 저장 클릭시
  const handleSave = () => {
    refWrite.current?.submit();
  };

  return (
    <Container>
      <BasicCard
        className='h-full max-w-screen-xl'
        isWidthFull
        titleClassName='pb-4 flex items-center justify-between'
        title={
          <div className='flex pb-2 items-center justify-between w-full font-medium text-xl text-gray-600 border-b border-red-500'>
            <div>공지 등록</div>
            <div>
              <Button
                variant='contained'
                color='secondary'
                size='medium'
                className='bg-rose-500 hover:bg-rose-600'
                onClick={listGo}
              >
                리스트
              </Button>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                size='medium'
                className='ml-4 text-sm'
                onClick={handleSave}
              >
                저장
              </Button>
              <Button
                type='submit'
                variant='contained'
                color='info'
                size='medium'
                className='ml-4 text-sm'
                onClick={handleCancel}
              >
                취소
              </Button>
            </div>
          </div>
        }
      >
        <Write
          ref={refWrite}
          opSubmit={handleSubmit}
          isFetching={isDetailDataFetching}
          detailData={detailData}
        />
      </BasicCard>
    </Container>
  );
};

/** layout */
withLayout(Save);

export default Save;

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const id = Number(context.query.id);
  const pageNo = Number(context.query.pageNo);

  return {
    props: {
      id,
      pageNo,
    },
  };
};
