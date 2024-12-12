import { Input, SearchItemsContainer, Select } from '@oxygen/ui-kit';
import { Form, type FormProps } from 'antd';
import { FORM_ITEM_NAMES } from '../../utils/consts';
import { useTr } from '@oxygen/translation';
import { createGeneralInfoSchema, GeneralInfoValuesType } from '../../types';
import * as S from './general-info.style';
import { createSchemaFieldRule } from 'antd-zod';
import { updateGetInfoStep, nextStep, useAppDispatch, useAppState } from '../../context';
import Footer from '../footer/footer';
import Box from '../box/box';
import FormItem from '../form-item/form-item';
import { useRouter } from 'next/navigation';

const options = [
  { label: 'گزینه اول', value: '1' },
  { label: 'گزینه دوم', value: '2' },
  { label: 'گزینه سوم', value: '3' },
];

export default function GeneralInfo() {
  const [form] = Form.useForm<GeneralInfoValuesType>();
  const [t] = useTr();
  const rule = createSchemaFieldRule(createGeneralInfoSchema(t));
  const dispatch = useAppDispatch();
  const state = useAppState();
  const router = useRouter();

  const onFinish: FormProps<GeneralInfoValuesType>['onFinish'] = async (values) => {
    nextStep(dispatch);
    updateGetInfoStep(dispatch, values);
  };

  const onReturn = () => {
    router.back();
  };

  return (
    <S.Container>
      <Box>
        <Form layout={'vertical'} initialValues={state.generalInfo} onFinish={onFinish} form={form}>
          <SearchItemsContainer>
            <FormItem name={FORM_ITEM_NAMES.englishName} className='span-2' label={t('english_name')} rules={[rule]}>
              <Input disabled placeholder={t('enter_english_name')} />
            </FormItem>
            <FormItem name={FORM_ITEM_NAMES.persianName} className='span-2' label={t('persian_name')} rules={[rule]}>
              <Input placeholder={t('enter_persian_name')} />
            </FormItem>
            <FormItem name={FORM_ITEM_NAMES.access} className='span-2' rules={[rule]} label={t('access')}>
              <Select size={'large'} placeholder={t('select_access')} options={options}></Select>
            </FormItem>
            <FormItem name={FORM_ITEM_NAMES.category} className='span-2' rules={[rule]} label={t('category')}>
              <Select size={'large'} placeholder={t('select_categroy')} options={options}></Select>
            </FormItem>
            <FormItem name={FORM_ITEM_NAMES.throughout} className='span-2' rules={[rule]} label={t('throughout')}>
              <Select size={'large'} placeholder={t('throughout')} options={options}></Select>
            </FormItem>
            <FormItem name={FORM_ITEM_NAMES.version} className='span-2' label={t('version')} rules={[rule]}>
              <Input placeholder={t('enter_version')} />
            </FormItem>
            <FormItem name={FORM_ITEM_NAMES.owner} className='span-2' label={t('owner')} rules={[rule]}>
              <Input placeholder={t('enter_owner')} />
            </FormItem>
            <FormItem name={FORM_ITEM_NAMES.tag} className='span-2' rules={[rule]} label={t('tag')}>
              <Select size={'large'} placeholder={t('enter_tag')} options={options}></Select>
            </FormItem>
          </SearchItemsContainer>
        </Form>
      </Box>

      <Footer onRegister={form.submit} onReturn={onReturn} />
    </S.Container>
  );
}
