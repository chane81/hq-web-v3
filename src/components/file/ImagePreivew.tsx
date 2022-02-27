import { FC } from 'react';

/** props */
interface IProps {
  url: string;
}

interface IFile extends File {
  preview?: string;
}

/** component: 업로드 dropzone > 이미지 프리뷰  */
const ImagePreview: FC<IProps> = ({ url }) => {
  return (
    <div className='h-full w-full m-auto p-2'>
      <img className='h-full w-full' alt='preview' src={url} />
    </div>
  );
};

export default ImagePreview;
