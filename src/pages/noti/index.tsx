import { FC } from 'react';
import { styled } from 'twin.macro';
import Button from '@mui/material/Button';
import { BasicCard } from '~/components/card/BasicCard';
import { withLayout } from '~/src/utils/withLayout';
import { BaseContainer } from '~/components/share/BaseContainer';
import { List } from '~/views/noti/base/List';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

/** style */
const Container = styled(BaseContainer)``;

/** props */
interface IProps {
  pageNo?: number;
}

/** component: 공지 리스트 */
const Noti: FC<IProps> = ({ pageNo }) => {
  const router = useRouter();

  // 공지 등록 이동
  const handleRegist = () => {
    router.push('/noti/save');
  };

  return (
    <Container>
      <BasicCard
        className='h-full'
        isWidthFull
        titleClassName='pb-4 flex items-center justify-between'
        title={
          <>
            <div className='font-medium text-xl text-gray-600'>공지 리스트</div>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='medium'
              className='text-sm'
              onClick={handleRegist}
            >
              공지 등록
            </Button>
          </>
        }
      >
        <List pageNo={pageNo} />
      </BasicCard>
    </Container>
  );
};

/** layout */
withLayout(Noti);

export default Noti;

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const pageNo = Number(context.query.pageNo || 1);

  return {
    props: {
      pageNo,
    },
  };
};
