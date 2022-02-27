import { FC } from 'react';
import { styled } from 'twin.macro';
import { BasicCard } from '~/components/card/BasicCard';
import { withLayout } from '~/src/utils/withLayout';
import { BaseContainer } from '~/components/share/BaseContainer';
import { useStore } from '~/stores';
import { observer } from 'mobx-react-lite';
import { List } from '~/views/coupon/base/List';

/** style */
const Container = styled(BaseContainer)``;

const Coupon: FC = () => {
  const { couponModel } = useStore();

  return (
    <Container>
      <BasicCard
        className='h-full'
        isWidthFull
        titleClassName='pb-4 flex items-center justify-between'
        title={
          <>
            <div className='font-medium text-xl text-gray-600'>
              쿠폰 리스트 (총 {couponModel.totalCount}건)
            </div>
          </>
        }
      >
        <List />
      </BasicCard>
    </Container>
  );
};

/** layout */
withLayout(Coupon);

export default observer(Coupon);
