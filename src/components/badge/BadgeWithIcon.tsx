import Button from '@mui/material/Button';
import { FC } from 'react';
import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`p-0`}
  button {
    ${tw`font-bold text-white bg-black w-max p-0.5 m-auto text-xs justify-center leading-4 my-2`}
  }
`;

/** props */
interface IProps {
  className?: string;
  state: string;
  title: string;
}

/** component: 출고 아이콘 배지 */
const BadgeWithIcon: FC<IProps> = ({ state, title }) => {
  return (
    <Container>
      <Button variant='contained' size='small'>
        <span>{title}</span>
        {state && (
          <img
            src={`/images/icons/${state}.svg`}
            alt={state}
            className='w-4 ml-1'
          />
        )}
      </Button>
    </Container>
  );
};

export { BadgeWithIcon };
