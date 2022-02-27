import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAutoLogout } from '~/hooks/useAutoLogout';

const Index: FC = () => {
  const router = useRouter();

  const { isFetching, isOk } = useAutoLogout(true);

  const invalid = isFetching || !isOk;

  if (invalid) {
    return <></>;
  } else {
    router.push('/company');
  }

  return <div />;
};

export default Index;
