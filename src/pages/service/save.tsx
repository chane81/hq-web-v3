import { FC, useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';
import Button from '@mui/material/Button';
import { BaseContainer } from '~/components/share/BaseContainer';
import { withLayout } from '~/src/utils/withLayout';
import { BasicCard } from '~/components/card/BasicCard';
import { useRouter } from 'next/router';
import { useMutationApi, useQueryApi, useQueryClient } from '~/hooks/useQueryApi';
import Write, {
  IForm as IFormWrite,
  IRef as IRefWrite,
} from '~/views/service/save/Write';
import { GetServerSideProps } from 'next';
import { API_SERVICE } from '~/constants/apis/service';
import { ToastMsg } from '~/components/message/ToastMsg';
import { toast } from 'react-toastify';
import { IResSetServiceInsert } from '~/types/apis/service/post.serviceInsert';
import {
  IReqGetServiceDetail,
  IResGetServiceDetail,
} from '~/types/apis/service/get.serviceDetail';
import { IResSetServiceModify } from '~/types/apis/service/post.serviceModify';

interface IMG_INFO {
  FILE_NAME?: string;
  MAIN_EVENT_YN?: 'Y' | 'N';
  MAIN_YN?: 'Y' | 'N';
  IMG_URL?: string;
  IMAGE_ID?: number;
  DEL_YN?: 'Y' | 'N';
  NEW_YN?: 'Y' | 'N';
  SORT?: number;
}

/** style */
const Container = styled(BaseContainer)`
  ${tw`flex justify-center`}
`;

/** props */
interface IProps {
  id?: number;
  pageNo?: number;
}

/** component: 서비스 정보 등록/수정 */
const Save: FC<IProps> = ({ id, pageNo }) => {
  const router = useRouter();
  const [mainYnNums, setMainYnNums] = useState<number[]>([]);
  const refWrite = useRef<IRefWrite>(null);
  const isModify = !!id;
  const queryClient = useQueryClient();

  // api call - 서비스 정보 등록
  const { mutateAsync: insertMutate } = useMutationApi<
    IResSetServiceInsert,
    FormData
  >({
    axiosConfig: {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  });

  // api call - 서비스 정보 수정
  const { mutateAsync: modifyMutate } = useMutationApi<
    IResSetServiceModify,
    FormData
  >({
    axiosConfig: {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  });

  // api call - 서비스 상세 key
  const detailQueryKey = [
    API_SERVICE.GET_DETAIL,
    {
      SERVICE_ID: id || 0,
    },
  ];

  // api call - 서비스 상세
  const {
    data: detailData,
    refetch: detailRefetch,
    isFetching: isDetailDataFetching,
  } = useQueryApi<IResGetServiceDetail, IReqGetServiceDetail>(detailQueryKey, {
    queryConfig: {
      enabled: !!id,
    },
  });

  // 리스트로 이동
  const listGo = () => router.push(`/service?pageNo=${pageNo}`);

  // 서비스정보 등록 및 수정
  const handleSubmit = async (data: IFormWrite) => {
    // form data 생성
    const formData = new FormData();
    formData.append('COMPANY_ID', data.companyId.toString());
    formData.append('NAME', data.serviceName);
    formData.append('SHORT_DESC', data.shortDesc);
    formData.append('DESC', data.desc);
    formData.append('CATEG_CD', data.categCd);
    formData.append('DEL_YN', data.delYn);

    const imgInfos: IMG_INFO[] = [];

    // 이미지 정보 file form data
    data.imgInfos?.forEach((img, idx) => {
      if (img) {
        if (img.fileObj) {
          // image files
          formData.append(`IMGS`, img.fileObj);
        }

        // 이미지 정보
        imgInfos.push({
          FILE_NAME: img.fileObj?.name || '',
          IMAGE_ID: img.imgId,
          MAIN_EVENT_YN: img?.isMobileMain ? 'Y' : 'N',
          MAIN_YN: img?.isMain ? 'Y' : 'N',
          SORT: idx + 1,
        });
      }
    });

    // 이미지 정보 JSON string form data
    formData.append('IMG_INFOS', JSON.stringify(imgInfos));

    if (isModify) {
      const delInfos =
        data.delImgInfos?.map((val) => ({
          IMAGE_ID: val.imgId,
          IMG_URL: val.imgUrl,
        })) || [];

      formData.append('SERVICE_ID', id.toString());
      formData.append('DEL_IMGS', JSON.stringify(delInfos));
    }

    // call api - 등록
    const res = isModify
      ? await modifyMutate({
          url: API_SERVICE.POST_MODIFY,
          body: formData,
        })
      : await insertMutate({
          url: API_SERVICE.POST_INSERT,
          body: formData,
        });

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
            <div>서비스 등록</div>
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
          isModify={!!id}
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
