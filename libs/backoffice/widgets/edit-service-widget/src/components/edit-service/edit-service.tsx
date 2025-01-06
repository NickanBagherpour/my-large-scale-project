import { SelectHandler } from 'rc-select/lib/Select';
import { createSchemaFieldRule } from 'antd-zod';
import { Form, FormInstance } from 'antd';
import { Divider, Input, Select } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { categoryOptions, FORM_ITEM_NAMES, tagOptions } from '../../utils/consts';
import { createFormSchema } from '../../types';
import * as S from './edit-service.style';
import { DefaultOptionType } from 'antd/es/cascader';
import { useState } from 'react';

type Props = {
  serviceInfo: any;
  form: FormInstance<any>;
  onSubmit: (values: SubmitEvent) => void;
};

const EditService: React.FC<Props> = ({ serviceInfo, form, onSubmit }) => {
  const [t] = useTr();
  const rule = createSchemaFieldRule(createFormSchema(t));
  const [tags, setTags] = useState<string[]>([]);

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
  const handleSelectTag: SelectHandler<any, DefaultOptionType> | undefined = (value) => {
    if (!tags.includes(value)) {
      setTags([...tags, value]);
    }
  };

  return (
    <Form layout={'vertical'} onFinish={onSubmit} form={form} initialValues={defaultValues}>
      <S.FormItemsContainer>
        <S.FormItem name={FORM_ITEM_NAMES.enName} label={t('form.en-name')} rules={[rule]}>
          <Input placeholder={t('placeholder.en-name')} />
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.faName} label={t('form.fa-name')} rules={[rule]}>
          <Input placeholder={t('placeholder.fa-name')} />
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.access} rules={[rule]} label={t('form.access')}>
          <Input size={'large'} placeholder={t('placeholder.access')} readOnly></Input>
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.category} rules={[rule]} label={t('form.category')}>
          <Select size={'large'} placeholder={t('placeholder.category')} options={categoryOptions}></Select>
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.throughout} rules={[rule]} label={t('form.throughput')}>
          <Input size={'large'} placeholder={t('placeholder.throughput')} readOnly></Input>
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.version} label={t('form.version')} rules={[rule]}>
          <Input placeholder={t('placeholder.version')} />
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.path} label={t('form.owner')} rules={[rule]}>
          <Input placeholder={t('placeholder.owner')} />
        </S.FormItem>
      </S.FormItemsContainer>
      <S.TagContainer>
        <S.FormTagItem name={FORM_ITEM_NAMES.tag} label={t('form.tag')} rules={[rule]}>
          <Select
            value={tags}
            onSelect={handleSelectTag}
            size={'large'}
            placeholder={t('placeholder.tag')}
            options={tagOptions}
          ></Select>
        </S.FormTagItem>
        <Divider type='vertical' />
        {tags.map((t) => (
          <></>
        ))}
      </S.TagContainer>
    </Form>
  );
};
export default EditService;
