import { useRouter } from 'next/navigation';
import FormItem from 'antd/lib/form/FormItem';
import { createSchemaFieldRule } from 'antd-zod';
import { Form, FormInstance } from 'antd';

import { Chip, Dropdown, Input, Select } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { ROUTES } from '@oxygen/utils';
import { useApp } from '@oxygen/hooks';

import { FORM_ITEM_NAMES } from '../../utils/consts';
import { createEditServiceFormSchema, EditServiceFormFieldsType } from '../../types';
import { useGetServiceAccess } from '../../services/get-access.api';
import { useGetServiceCategories } from '../../services/get-categories.api';
import { useGetServiceTags } from '../../services/get-tags.api';
import {
  convertEnum,
  convertTags,
  convertToCodeTitle,
  convertToOption,
  SelectOptionType,
} from '../../utils/select-helper';
import { ServiceInfoDto } from '../../types/edit-service.type';
import { useEditServiceMutation } from '../../services/post-edit-service.api';

import * as S from './edit-service.style';

type Props = {
  serviceInfo?: ServiceInfoDto;
  form: FormInstance<any>;
};

const EditService: React.FC<Props> = ({ serviceInfo, form }) => {
  const [t] = useTr();
  const rule = createSchemaFieldRule(createEditServiceFormSchema(t));
  const { data: accessList, isFetching: isAccessLoading } = useGetServiceAccess();
  const { data: categoryList, isFetching: isCategoryLoading } = useGetServiceCategories();
  const { data: tagList, isFetching: isTagLoading } = useGetServiceTags();
  const accessOptions = convertEnum(accessList);
  const categoryOptions = convertEnum(categoryList);
  const tagOptions = convertTags(tagList);
  const selectedTags: SelectOptionType[] = Form.useWatch(FORM_ITEM_NAMES.tags, form);
  const { notification } = useApp();
  const router = useRouter();
  const handleSuccess = (serviceName?: string) => {
    router.push(
      `${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${serviceName ?? ''}` // Replace 123 with your item ID
    );
    notification.success({
      message: t('alert.edit_success'),
    });
  };
  const { mutate: editService } = useEditServiceMutation(handleSuccess, serviceInfo?.name, serviceInfo?.serviceInfoId);

  const defaultValues = {
    [FORM_ITEM_NAMES.faName]: serviceInfo?.persianName,
    [FORM_ITEM_NAMES.enName]: serviceInfo?.name,
    [FORM_ITEM_NAMES.category]: serviceInfo?.category.code,
    [FORM_ITEM_NAMES.access]: serviceInfo?.accessLevel && convertToOption(serviceInfo?.accessLevel),
    [FORM_ITEM_NAMES.owner]: serviceInfo?.owner,
    [FORM_ITEM_NAMES.throughput]: serviceInfo?.throughput.title,
    [FORM_ITEM_NAMES.version]: serviceInfo?.version,
    [FORM_ITEM_NAMES.tags]: convertTags(serviceInfo?.tags),
  };

  const handleClose = (removedTag: SelectOptionType) => {
    if (selectedTags.length > 1) {
      form.setFieldValue(
        FORM_ITEM_NAMES.tags,
        selectedTags?.filter((t) => t.value !== removedTag.value)
      );
    }
  };
  const handleSubmit = async (values: EditServiceFormFieldsType) => {
    // form.submit();
    editService({
      latinName: values[FORM_ITEM_NAMES.enName],
      persianName: values[FORM_ITEM_NAMES.faName],
      accessLevel: convertToCodeTitle(values[FORM_ITEM_NAMES.access]),
      categoryCode: values[FORM_ITEM_NAMES.category],
      throughput: convertToCodeTitle(values[FORM_ITEM_NAMES.throughput]),
      version: values[FORM_ITEM_NAMES.version],
      ownerName: values[FORM_ITEM_NAMES.owner],
      tagsIds: values[FORM_ITEM_NAMES.tags].map((t) => t.value),
    });
  };
  return (
    <Form layout={'vertical'} onFinish={handleSubmit} form={form} initialValues={defaultValues}>
      <S.FormItemsContainer>
        <S.FormItem name={FORM_ITEM_NAMES.enName} label={t('form.en-name')} rules={[rule]}>
          <Input
            disabled={true}
            placeholder={t('placeholder.en-name')}
            defaultValue={defaultValues[FORM_ITEM_NAMES.enName] as ServiceInfoDto['name']}
          />
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.faName} label={t('form.fa-name')} rules={[rule]}>
          <Input
            placeholder={t('placeholder.fa-name')}
            defaultValue={defaultValues[FORM_ITEM_NAMES.faName] as string}
          />
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.access} rules={[rule]} label={t('form.access')}>
          <Select
            labelInValue={true}
            disabled={true}
            options={accessOptions}
            size={'large'}
            placeholder={t('placeholder.access')}
            loading={isAccessLoading}
          ></Select>
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.category} rules={[rule]} label={t('form.category')}>
          <Select
            options={categoryOptions}
            size={'large'}
            placeholder={t('placeholder.category')}
            loading={isCategoryLoading}
            defaultValue={defaultValues[FORM_ITEM_NAMES.category]}
          ></Select>
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.throughput} rules={[rule]} label={t('form.throughput')}>
          <Input disabled={true} size={'large'} readOnly></Input>
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.version} label={t('form.version')} rules={[rule]}>
          <Input placeholder={t('placeholder.version')} />
        </S.FormItem>
        <S.FormItem name={FORM_ITEM_NAMES.owner} label={t('form.owner')} rules={[rule]}>
          <Input placeholder={t('placeholder.owner')} />
        </S.FormItem>
      </S.FormItemsContainer>
      <S.TagContainer>
        <S.TagPicker>
          <S.TagFormItem name={FORM_ITEM_NAMES.tags} rules={[rule]}>
            <Dropdown.Select multiSelect loading={isTagLoading} menu={tagOptions}>
              {t('placeholder.tag')}
            </Dropdown.Select>
          </S.TagFormItem>

          {selectedTags?.map((item) => (
            <Chip
              closable={selectedTags.length > 1}
              ellipsis
              closeIcon
              type='active'
              key={item.value}
              tooltipOnEllipsis
              tooltipTitle={item.label ?? ''}
              onClose={() => handleClose(item)}
            >
              {item.label}
            </Chip>
          ))}
        </S.TagPicker>
      </S.TagContainer>
    </Form>
  );
};
export default EditService;
