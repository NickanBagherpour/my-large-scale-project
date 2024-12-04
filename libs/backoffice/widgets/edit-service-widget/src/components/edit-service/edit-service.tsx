import { Form, FormInstance } from 'antd';
import * as S from './edit-service.style';
import {
  accessOptions,
  categoryOptions,
  FORM_ITEM_NAMES,
  protocolOptions,
  tagOptions,
  throughoutOptions,
  upstreamOptions,
} from '../../utils/consts';
import { Input, Select } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { createSchemaFieldRule } from 'antd-zod';
import { createFormSchema } from '../../types';
type Props = {
  serviceInfo: any;
  form: FormInstance<any>;
};

const EditService: React.FC<Props> = ({ serviceInfo, form }) => {
  const [t] = useTr();
  const rule = createSchemaFieldRule(createFormSchema(t));

  const defaultValues = {
    [FORM_ITEM_NAMES.faName]: serviceInfo.faName,
    [FORM_ITEM_NAMES.tag]: serviceInfo.tags,
    [FORM_ITEM_NAMES.enName]: serviceInfo.enName,
    [FORM_ITEM_NAMES.category]: serviceInfo.category,
    [FORM_ITEM_NAMES.access]: serviceInfo.access,
    [FORM_ITEM_NAMES.host]: serviceInfo.host,
    [FORM_ITEM_NAMES.method]: serviceInfo.method,
    [FORM_ITEM_NAMES.owner]: serviceInfo.owner,
    [FORM_ITEM_NAMES.path]: serviceInfo.path,
    [FORM_ITEM_NAMES.protocol]: serviceInfo.protocol,
    [FORM_ITEM_NAMES.throughout]: serviceInfo.throughout,
    [FORM_ITEM_NAMES.upstream]: serviceInfo.upstream,
    [FORM_ITEM_NAMES.version]: serviceInfo.version,
  };
  const handleSubmit = (values: any) => {
    console.log('submit', values);
  };
  return (
    <Form layout={'vertical'} onFinish={handleSubmit} form={form} initialValues={defaultValues}>
      <S.FormItemsContainer>
        <S.LargeFormItem name={FORM_ITEM_NAMES.enName} label={t('form.en-name')} rules={[rule]}>
          <Input placeholder={t('placeholder.en-name')} />
        </S.LargeFormItem>
        <S.LargeFormItem name={FORM_ITEM_NAMES.faName} label={t('form.fa-name')} rules={[rule]}>
          <Input placeholder={t('placeholder.fa-name')} />
        </S.LargeFormItem>
        <S.FormItem name={FORM_ITEM_NAMES.access} rules={[rule]} label={t('form.access')}>
          <Select size={'large'} placeholder={t('placeholder.access')} options={accessOptions}></Select>
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.category} rules={[rule]} label={t('form.category')}>
          <Select size={'large'} placeholder={t('placeholder.category')} options={categoryOptions}></Select>
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.throughout} rules={[rule]} label={t('form.throughout')}>
          <Select size={'large'} placeholder={t('placeholder.throughout')} options={throughoutOptions}></Select>
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.version} label={t('form.version')} rules={[rule]}>
          <Input placeholder={t('placeholder.version')} />
        </S.FormItem>
        <S.LargeFormItem name={FORM_ITEM_NAMES.path} label={t('form.owner')} rules={[rule]}>
          <Input placeholder={t('placeholder.owner')} />
        </S.LargeFormItem>
        <S.LargeFormItem name={FORM_ITEM_NAMES.path} label={t('form.tag')} rules={[rule]}>
          <Select size={'large'} placeholder={t('placeholder.tag')} options={tagOptions}></Select>
        </S.LargeFormItem>
      </S.FormItemsContainer>
    </Form>
  );
};
export default EditService;
