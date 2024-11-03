import { Input, SearchItemsContainer, Select } from '@oxygen/ui-kit';
import { Form } from 'antd';
import { FORM_ITEM_NAMES } from '../../utils/consts';
import { useTr } from '@oxygen/translation';
import { createFormSchema } from '../../types';
import * as S from './get-info.style';
import { createSchemaFieldRule } from 'antd-zod';
import { updateStep, useAppDispatch } from '../../context';
import Footer from '../footer/footer';
import Box from '../box/box';

const options = [
  { label: 'گزینه اول', value: '1' },
  { label: 'گزینه دوم', value: '2' },
  { label: 'گزینه سوم', value: '3' },
];

export default function GetInfo() {
  const [form] = Form.useForm();
  const [t] = useTr();
  const rule = createSchemaFieldRule(createFormSchema(t));
  const dispatch = useAppDispatch();

  const onFinish = async (values) => {
    updateStep(dispatch, 1);
  };

  return (
    <S.Container>
      <Box>
        <S.Form layout={'vertical'} onFinish={onFinish} form={form}>
          <SearchItemsContainer>
            <Form.Item name={FORM_ITEM_NAMES.englishName} className='span-2' label={t('english_name')} rules={[rule]}>
              <Input placeholder={t('enter_english_name')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.persianName} className='span-2' label={t('persian_name')} rules={[rule]}>
              <Input placeholder={t('enter_persian_name')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.actionOrMethod} label={t('action_or_method')} rules={[rule]}>
              <Input placeholder={t('enter_action_or_method')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.protocole} rules={[rule]} label={t('protocole')}>
              <Select size={'large'} placeholder={t('select_protocole')} options={options}></Select>
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.access} rules={[rule]} label={t('access')}>
              <Select size={'large'} placeholder={t('select_access')} options={options}></Select>
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.category} rules={[rule]} label={t('category')}>
              <Select size={'large'} placeholder={t('select_categroy')} options={options}></Select>
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.throughout} rules={[rule]} label={t('throughout')}>
              <Select size={'large'} placeholder={t('throughout')} options={options}></Select>
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.version} label={t('version')} rules={[rule]}>
              <Input placeholder={t('enter_version')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.owner} label={t('owner')} rules={[rule]}>
              <Input placeholder={t('enter_owner')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.tag} rules={[rule]} label={t('tag')}>
              <Select size={'large'} placeholder={t('enter_tag')} options={options}></Select>
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.path} className='span-2' label={t('path')} rules={[rule]}>
              <Input placeholder={t('path')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.host} className='span-2' label={t('host')} rules={[rule]}>
              <Input placeholder={t('host')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.upstream} className='span-2' rules={[rule]} label={t('upstream')}>
              <Select size={'large'} placeholder={t('upstream')} options={options}></Select>
            </Form.Item>
          </SearchItemsContainer>
        </S.Form>
      </Box>

      <Footer onRegister={() => form.submit()} onReturn={() => void 1} />
    </S.Container>
  );
}
