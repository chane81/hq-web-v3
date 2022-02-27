import { FC } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@mui/icons-material/Check';
import tw, { styled } from 'twin.macro';
import {
  FilePreviewDropzone,
  IFile,
  IFileRejection,
} from '~/components/file/FilePreviewDropzone';

/** props */
interface IProps {
  /** 버튼 2개다 표시할 지 여부 */
  isTwoBtnShow?: boolean;
  /** 첫번째 버튼 true/false value */
  isFirstBtn?: boolean;
  /** 두번째 버튼 true/false value */
  isSecondBtn?: boolean;
  /** 미리보기 이미지(db에서 이미지 정보 가져왔을 때 여기 바인딩) */
  previewUrl?: string;
  /** 첫번째 버튼 텍스트 */
  firstBtnText?: string;
  /** 두번째 버튼 텍스트 */
  secondBtnText?: string;
  /** 파일 드랍시 */
  opDrop?: (file: IFile) => void;
  /** 파일 reject 시 */
  opReject?: (errorCode?: string, fileRejections?: IFileRejection[]) => void;
  /** 파일 삭제시 */
  opRemoveFile?: () => void;
  /** 첫번째 버튼 토글 */
  opFirstBtnToggle?: () => void;
  /** 두번째 버튼 토글 */
  opSecondBtnToggle?: () => void;
}

/** style */
const Container = styled.div<Pick<IProps, 'isTwoBtnShow'>>`
  .drop-zone {
    ${tw`h-40 rounded-t`};
  }

  .img-main-yn {
    ${tw`rounded-b rounded-t-none border-t-0`};

    ${(props) => (props.isTwoBtnShow ? tw`rounded-br-none` : '')}
  }

  .img-main-event-yn {
    ${tw`rounded-b rounded-t-none rounded-bl-none border-t-0 border-l-0`};
  }
`;

/** component: 이미지 업로드 및 메인/대표 노출여부 설정 */
const FileCard: FC<IProps> = ({
  isTwoBtnShow = false,
  isFirstBtn,
  isSecondBtn,
  previewUrl,
  firstBtnText = '',
  secondBtnText = '',
  opDrop,
  opReject,
  opRemoveFile,
  opFirstBtnToggle,
  opSecondBtnToggle,
}) => {
  // 파일 drag & drop
  const handleDrop = (files: IFile[]) => {
    opDrop?.(files?.[0]);
  };

  // 파일 reject
  const handleReject = (errorCode?: string, fileRejections?: IFileRejection[]) => {
    opReject?.(errorCode, fileRejections);
  };

  // 파일 삭제
  const handleRemoveFile = () => {
    opRemoveFile?.();
  };

  return (
    <Container isTwoBtnShow={isTwoBtnShow}>
      <FilePreviewDropzone
        type='image'
        previewUrl={previewUrl}
        className='drop-zone'
        opDrop={handleDrop}
        opDropRejected={handleReject}
        opRemoveFile={handleRemoveFile}
      />
      <div className='flex'>
        {/* 첫번째 버튼 */}
        <ToggleButton
          value='check'
          selected={isFirstBtn}
          fullWidth
          color='secondary'
          className='img-main-yn'
          onChange={opFirstBtnToggle}
        >
          <CheckIcon />
          {firstBtnText}
        </ToggleButton>
        {/* 첫번째 버튼 */}
        {/* 두번째 버튼 */}
        {isTwoBtnShow && (
          <ToggleButton
            value='check'
            selected={isSecondBtn}
            fullWidth
            color='secondary'
            className='img-main-event-yn'
            onChange={opSecondBtnToggle}
          >
            <CheckIcon />
            {secondBtnText}
          </ToggleButton>
        )}
        {/* 두번째 버튼 */}
      </div>
    </Container>
  );
};

export { FileCard };
