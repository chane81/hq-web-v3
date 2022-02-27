import { FC } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { convertMoneyText } from '~/utils/commonUtils';

/** props */
interface IProps {
  className?: string;
  isMoneyComma?: boolean;
  delay?: number;
  fromNum: number;
  toNum: number;
}

/** component: 숫자 animation */
const AniNumber: FC<IProps> = ({
  className,
  isMoneyComma = false,
  delay = 500,
  fromNum = 1,
  toNum = 1,
}) => {
  const sprProps = useSpring({
    delay,
    config: config.molasses,
    from: { number: fromNum },
    to: { number: toNum },
  });

  return (
    <animated.div className={className}>
      {sprProps.number.to((val) =>
        isMoneyComma ? convertMoneyText(Math.floor(val)) : Math.floor(val),
      )}
    </animated.div>
  );
};

export { AniNumber };
