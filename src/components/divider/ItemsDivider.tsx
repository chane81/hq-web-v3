import { FC } from 'react';
import tw, { styled } from 'twin.macro';

/** style */
const Container = styled.span`
  margin-top: 0.1rem;
  ${tw`w-1 h-4 border-r border-gray-400`}
`;

/** props */
interface IProps {
  className?: string;
}

export const ItemDivider: FC<IProps> = (props) => (
  <Container {...props}>&nbsp;</Container>
);
