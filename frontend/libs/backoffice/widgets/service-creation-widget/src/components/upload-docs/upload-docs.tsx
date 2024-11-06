import { Form, type FormProps } from 'antd';
import Footer from '../footer/footer';
import { Button } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import * as S from './upload-docs.style';
import Box from '../box/box';
import { useState } from 'react';
import { UploadFile } from 'antd/lib';
import { createUploadDocsSchema, UploadDocsType } from '../../types/upload-docs.schema';
import { createSchemaFieldRule } from 'antd-zod';
import { fileSize } from '@oxygen/utils';
import FormItem from '../form-item/form-item';
import { isExcel } from '../../utils/schema.utils';
import { UPLOAD_NAMES } from '../../utils/consts';
import { nextStep, updateUploadDocs, useAppDispatch } from '../../context';

const data = {
	progress: '52%',
	uploadRate: '213kb/sec',
};

function getFileDetails(file: UploadFile | null): null | { name: string; extension: string; size: number } {
	if (!file) return null;
	const nameArr = file.name.split('.');
	const extension = nameArr.at(-1);
	const fileName = nameArr.slice(0, nameArr.length - 1).join('.');
	return {
		name: fileName,
		extension: extension!,
		size: file.size!,
	};
}

export default function UploadDocs() {
	const [form] = Form.useForm<UploadDocsType>();
	const [t] = useTr();
	const [selectedFile, setSelectedFile] = useState<UploadFile | null>(null);
	const isFetching = false;
	const hasError = false;
	const fileDetails = getFileDetails(selectedFile);
	const rule = createSchemaFieldRule(createUploadDocsSchema(t));
	const dispatch = useAppDispatch();

	const onFinish: FormProps<UploadDocsType>['onFinish'] = (values) => {
		// nextStep(dispatch);
    updateUploadDocs(dispatch, values);
	};

	return (
		<S.Form onFinish={onFinish} form={form}>
			<Box>
				<FormItem name={UPLOAD_NAMES.file} rules={[rule]}>
					<S.Dragger
						multiple={false}
						fileList={selectedFile ? [selectedFile] : []}
						onChange={({ file }) => setSelectedFile(file)}
						customRequest={() => null}
						itemRender={() => null}
						disabled={isFetching}
					>
						<S.UploadIcon className='icon-upload' />
						<S.Title>{t('choose_or_drag_file')}</S.Title>
						<S.Subtitle>{t('file_format_xls')}</S.Subtitle>
						<Button color='secondary' disabled={isFetching}>
							<S.PlusIcon className='icon-plus' />
							{t('add_docs')}
						</Button>
					</S.Dragger>
				</FormItem>

				{!!fileDetails && selectedFile && (
					<S.Status hasError={hasError}>
						<S.Header>
							<S.Group>
								{isExcel({ file: selectedFile }) && <S.ExcelIcon className='icon-excel' />}
								<S.Name>{fileDetails.name}</S.Name>
								<S.Extesion>{fileDetails.extension}</S.Extesion>
								<S.Size>{fileSize(fileDetails.size)}</S.Size>
							</S.Group>

							<S.Group>
								{hasError && <S.ErrMsg>{t('upload_error')}</S.ErrMsg>}
								{isFetching ? (
									<S.ActionBtn variant='link' hasError={false}>
										<i className='icon-close-circle' />
									</S.ActionBtn>
								) : (
									<S.ActionBtn variant='link' hasError={hasError} onClick={() => setSelectedFile(null)}>
										<i className='icon-trash' />
									</S.ActionBtn>
								)}
							</S.Group>
						</S.Header>

						{isFetching && (
							<>
								<S.Progress percent={50} showInfo={false} isPrimary />
								<S.ProgressInfo>
									<span>{data.progress}</span>
									<span>{data.uploadRate}</span>
								</S.ProgressInfo>
							</>
						)}
					</S.Status>
				)}
			</Box>

			<Footer onRegister={() => form.submit()} />
		</S.Form>
	);
}
