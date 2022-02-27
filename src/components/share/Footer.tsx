import { FC } from 'react';
import tw, { styled } from 'twin.macro';

/** style */
const Container = styled.div`
  ${tw`p-3 bg-gray-100 border-t border-gray-200 leading-6`}
`;

const Footer: FC = () => {
  return (
    <Container>
      <div className='flex items-center'>
        <div className='font-medium text-sm text-bluegray-500'>
          (주)한국농산어촌네트워크
        </div>
        <div className='text-sm text-bluegray-400 ml-2'>all rights reserved.</div>
      </div>
    </Container>
  );
};

export { Footer };
