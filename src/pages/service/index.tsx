import { FC } from 'react';
import { styled } from 'twin.macro';
import Button from '@mui/material/Button';
import { BasicCard } from '~/components/card/BasicCard';
import { withLayout } from '~/src/utils/withLayout';
import { BaseContainer } from '~/components/share/BaseContainer';
import { List } from '~/views/service/base/List';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

/** style */
const Container = styled(BaseContainer)``;

/** props */
interface IProps {
  pageNo?: number;
}

/** component: 서비스 리스트 */
const Service: FC<IProps> = ({ pageNo }) => {
  const router = useRouter();

  // 신규 기업 등록
  const handleRegist = () => {
    router.push('/service/save');
  };

  return (
    <Container>
      <BasicCard
        className='h-full'
        isWidthFull
        titleClassName='pb-4 flex items-center justify-between'
        title={
          <>
            <div className='font-medium text-xl text-gray-600'>서비스 리스트</div>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='medium'
              className='text-sm'
              onClick={handleRegist}
            >
              서비스 등록
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
withLayout(Service);

export default Service;

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const pageNo = Number(context.query.pageNo || 1);

  return {
    props: {
      pageNo,
    },
  };
};
