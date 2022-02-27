import { FC } from 'react';
import { styled } from 'twin.macro';
import Button from '@mui/material/Button';
import { BasicCard } from '~/components/card/BasicCard';
import { withLayout } from '~/src/utils/withLayout';
import { List } from '~/views/company/base/List';
import { BaseContainer } from '~/components/share/BaseContainer';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

/** style */
const Container = styled(BaseContainer)``;

/** props */
interface IProps {
  pageNo?: number;
}

/** component: 기업 리스트 */
const Company: FC<IProps> = ({ pageNo }) => {
  const router = useRouter();

  // 신규 기업 등록
  const handleRegist = () => {
    router.push('/company/save');
  };

  return (
    <Container>
      <BasicCard
        className='h-full'
        isWidthFull
        titleClassName='pb-4 flex items-center justify-between'
        title={
          <>
            <div className='font-medium text-xl text-gray-600'>기업 리스트</div>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='medium'
              className='text-sm'
              onClick={handleRegist}
            >
              신규 기업 등록
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
withLayout(Company);

export default Company;

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const pageNo = Number(context.query.pageNo || 1);

  return {
    props: {
      pageNo,
    },
  };
};
