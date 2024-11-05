import { Form } from 'antd';
import Footer from '../footer/footer';
import { Button } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import * as S from './upload-docs.style';
import Box from '../box/box';

export default function UploadDocs() {
  const [form] = Form.useForm();
  const [t] = useTr();
  const isFetching = false;
  const hasError = true;

  return (
    <S.Container>
      <Box>
        <S.Dragger>
          <S.UploadIcon className='icon-upload' />
          <S.Title>{t('choose_or_drag_file')}</S.Title>
          <S.Subtitle>{t('file_format_xls')}</S.Subtitle>
          <Button color='secondary'>
            <S.PlusIcon className='icon-plus' />
            {t('add_docs')}
          </Button>
        </S.Dragger>

        <S.Status hasError={hasError}>
          <S.Header>
            <S.Group>
              <S.PdfIcon className='icon-pdf' />
              <S.Name>فایل پی دی اف</S.Name>
              <S.Extesion>.pdf</S.Extesion>
              <S.Size>3.2/5 MB</S.Size>
            </S.Group>

            <S.Group>
              {hasError && <S.ErrMsg>{t('upload_error')}</S.ErrMsg>}
              {isFetching ? (
                <S.ActionBtn variant='link' hasError={false}>
                  <i className='icon-close-circle' />
                </S.ActionBtn>
              ) : (
                <S.ActionBtn variant='link' hasError={hasError}>
                  <i className='icon-trash' />
                </S.ActionBtn>
              )}
            </S.Group>
          </S.Header>

          {isFetching && (
            <>
              <S.Progress percent={50} showInfo={false} isPrimary />
              <S.ProgressInfo>
                <span>52%</span>
                <span>213kb/sec</span>
              </S.ProgressInfo>
            </>
          )}
        </S.Status>
      </Box>

      <Footer onRegister={() => form.submit()} onReturn={() => void 1} />
    </S.Container>
  );
}
