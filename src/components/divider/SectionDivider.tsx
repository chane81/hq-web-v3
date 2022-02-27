import { FC } from 'react';
import tw, { styled } from 'twin.macro';

/** style */
const Container = styled.div`
  ${tw`w-full border-b border-gray-200 my-3`}
`;

/** props */
interface IProps {
  className?: string;
}

export const SectionDivider: FC<IProps> = (props) => <Container {...props} />;
