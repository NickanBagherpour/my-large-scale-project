import { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { useBounce } from '@oxygen/hooks';

import { updateMessageAction, updateSearchTermAction, useAppDispatch } from '../../context';

import { Input } from '@oxygen/ui-kit';
import { CreateModal } from '@oxygen/reusable-components';
import { Form } from 'antd';

import * as S from './filters.style';
import { FORM_ITEM_NAMES } from '../../utils/consts';
import { createSchemaFieldRule } from 'antd-zod';
import { CreateUpstreamType, createUpstreamType } from '../../types/create-upstream-modal.schema';
import { useCreateUpstreamMutation } from '../../services/create-upstream.api';
import { useRouter } from 'next/navigation';
import { ROUTES, RQKEYS } from '@oxygen/utils';
import { queryClient } from '@oxygen/client';

export default function Filters() {
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [value, setValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm<CreateUpstreamType>();
  const rule = createSchemaFieldRule(createUpstreamType(t));

  useBounce(() => {
    updateSearchTermAction(dispatch, value);
  }, [value]);

  const { mutate, isPending } = useCreateUpstreamMutation();

  const handleCreateUpstream = async () => {
    try {
      const values = await form.validateFields();

      const params = {
        name: values.name,
        description: values.description,
      };

      await mutate(params, {
        onSettled: () => {
          setOpenModal(false);
          form.resetFields();
        },
        onSuccess: () => {
          router.push(`${ROUTES.BACKOFFICE.UPSTREAM_DETAILS}?upstreamName=${params.name}`);
          updateMessageAction(dispatch, {
            description: t('create_upstream_success'),
            type: 'success',
            shouldTranslate: false,
          });
          queryClient.invalidateQueries({ queryKey: [RQKEYS.UPSTREAM_LIST.GET_LIST] });
        },
        onError: (error) => {
          setOpenErrorModal(true);
        },
      });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.submit();
    handleCreateUpstream();
  };

  const handleFinish = (values) => {
    // console.log('handle finish');
  };

  return (
    <>
      <S.Container>
        <S.StyledText>{t('search')}</S.StyledText>
        <S.Actions>
          <S.StyledInput
            value={value}
            placeholder={t('search_by_name')}
            prefix={<i className='icon-search-normal' />}
            onChange={(e) => setValue(e.target.value)}
          />

          <S.Buttons>
            <S.StyledButton onClick={() => setOpenModal(!openModal)} color='primary' variant='solid'>
              {t('create_new_upstream')}
            </S.StyledButton>
          </S.Buttons>
        </S.Actions>
      </S.Container>
      {openModal && (
        <CreateModal
          title={t('create_new_upstream')}
          open={openModal}
          onCancel={handleCancel}
          onConfirm={handleOk}
          confirmLoading={isPending}
          okText={t('register_information')}
          showConfirm={true}
          okButtonProps={{ disabled: isPending }}
        >
          <S.StyledForm
            layout={'horizontal'}
            labelAlign={'left'}
            labelCol={{ span: 8 }}
            style={{ width: '100%' }}
            form={form}
            onFinish={handleFinish}
          >
            <Form.Item name={FORM_ITEM_NAMES.name} label={t('upstream_english_name')} rules={[rule]}>
              <Input allow={'letter'} />
            </Form.Item>

            <Form.Item name={FORM_ITEM_NAMES.description} label={t('upstream_persian_name')} rules={[rule]}>
              <Input allow={'letter'} />
            </Form.Item>
          </S.StyledForm>
        </CreateModal>
      )}
    </>
  );
}
