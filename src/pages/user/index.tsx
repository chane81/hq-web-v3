import { FC } from 'react';
import { styled } from 'twin.macro';
import { BasicCard } from '~/components/card/BasicCard';
import { withLayout } from '~/src/utils/withLayout';
import { BaseContainer } from '~/components/share/BaseContainer';
import List from '~/views/user/base/List';
import { useStore } from '~/stores';
import { observer } from 'mobx-react-lite';

/** style */
const Container = styled(BaseContainer)``;

/** component: 사용자 리스트 */
const User: FC = () => {
  const { userModel } = useStore();

  return (
    <Container>
      <BasicCard
        className='h-full'
        isWidthFull
        titleClassName='pb-4 flex items-center justify-between'
        title={
          <>
            <div className='font-medium text-xl text-gray-600'>
              사용자 리스트 (총 {userModel.totalCount}명)
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
withLayout(User);

export default observer(User);
