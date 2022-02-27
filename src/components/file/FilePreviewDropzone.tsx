import { FC, useEffect, useState } from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import tw, { styled } from 'twin.macro';
import Chip from '@mui/material/Chip';
import ImagePreview from './ImagePreivew';
import { getUniqueNumber } from '~/utils/commonUtils';

/** dropzone 관련 인터페이스 및 타입 */
export interface IFile extends File {
  preview?: string;
}
export interface IFileRejection extends FileRejection {}
export type TDropEvent = DropEvent;

/** style */
const Container = styled.div`
  ${tw`border border-gray-300`};

  .dropzone {
    height: 100%;
  }
`;

/** props */
interface IProps {
  className?: string;
  previewUrl?: string;
  type: string;
  maxFiles?: number;
  opDrop?: (
    files: IFile[],
    fileRejections?: IFileRejection[],
    event?: TDropEvent,
  ) => void;
  opDropRejected?: (
    errorCode?: string,
    fileRejections?: IFileRejection[],
    event?: TDropEvent,
  ) => void;
  opRemoveFile?: () => void;
}

/** 이미지 파일 드랍존 */
const FilePreviewDropzone: FC<IProps> = (props) => {
  const [filesState, setFilesState] = useState<IFile[]>([]);
  const [previewUrlState, setPreviewUrlState] = useState<string>(
    props.previewUrl || '',
  );

  // previewUrlState 값이 처음 로드시 빈값으로 로드되었다면
  // props.preiewUrl prop 값을 변경한 값으로 전달시 변화시키기 위해
  // useEffect 처리함
  useEffect(() => {
    setPreviewUrlState(props.previewUrl || '');
  }, [props.previewUrl]);

  // "image/*,audio/*,video/*"
  const fileType = props.type;

  // 파일명 rename
  const fileRename = (name: string) => {
    const newFileName = `${name.slice(
      0,
      name.lastIndexOf('.'),
    )}_${getUniqueNumber()}`;
    const ext = name.slice(name.lastIndexOf('.'));

    return `${newFileName}${ext}`;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: `${fileType}/*`,
    maxFiles: props.maxFiles ?? 1,
    onDrop: (
      acceptedFiles: IFile[],
      fileRejections: IFileRejection[],
      event: TDropEvent,
    ) => {
      // preview 파일 설정 및 파일명 rename 설정
      const previewFiles = acceptedFiles.map((file) => {
        // 동일한 파일명 중복을 막기 위해 rename 설정
        const newFile = new File([file], fileRename(file.name));

        return Object.assign(newFile, {
          preview: URL.createObjectURL(file),
        });
      });

      // set file state
      setFilesState(previewFiles);

      // props 전달
      props.opDrop?.(previewFiles, fileRejections, event);
    },
    onDropRejected: (fileRejections: FileRejection[], event: TDropEvent) => {
      // error code
      const errCode = fileRejections?.[0].errors?.[0].code || '';

      // props 전달
      props.opDropRejected?.(errCode, fileRejections, event);
    },
  });

  useEffect(
    () => () => {
      // 메모리 해제
      filesState.forEach(
        (file) => file.preview && URL.revokeObjectURL(file.preview),
      );
    },
    [filesState],
  );

  // 삭제 클릭시
  const handleRemoveClick = () => {
    setFilesState([]);
    setPreviewUrlState('');

    props.opRemoveFile?.();
  };

  return (
    <Container className={props.className}>
      <div className='w-full flex justify-center relative'>
        <Chip
          label='삭제'
          className='transition-all duration-300 hover:bg-gray-300 absolute -translate-y-1/2 h-6 cursor-pointer bg-gray-200'
          onClick={handleRemoveClick}
        />
      </div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className='h-full '>
          {previewUrlState || filesState.length > 0 ? (
            <aside className='flex flex-wrap h-full'>
              <ImagePreview
                url={filesState?.[0]?.preview ?? (props.previewUrl || '')}
              />
            </aside>
          ) : (
            <div className='h-full w-full flex justify-center items-center text-xl font-medium cursor-pointer'>
              +
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export { FilePreviewDropzone };
