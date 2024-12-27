import { Input, Loading, SearchItemsContainer, Select, Chip, Dropdown } from '@oxygen/ui-kit';
import { Form, type FormProps } from 'antd';
import { FORM_ITEM_NAMES } from '../../utils/consts';
import { useTr } from '@oxygen/translation';
import { CodeTitle, createGeneralInfoSchema, GeneralInfoValuesType } from '../../types';
import { createSchemaFieldRule } from 'antd-zod';
import { nextStep, useAppDispatch, useAppState } from '../../context';
import Footer from '../footer/footer';
import Box from '../box/box';
import FormItem from '../form-item/form-item';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '../container/container.style';
import {
  useGetCategories,
  useGetService,
  useGetServiceAccess,
  useGetTags,
  useGetThroughput,
  usePostGeneralInfoMutation,
} from '../../services';
import * as S from './general-info.style';
import { useToggle } from '@oxygen/hooks';
import ConfirmModal from '../cofirm-modal/confirm-modal';
import { convertCodeTitles, convertTags } from '../../utils/convert-enums';

const findInList = (list: CodeTitle[], code: number) => list.find((item) => item.code === code);

export default function GeneralInfo() {
  const [form] = Form.useForm<GeneralInfoValuesType>();
  const [t] = useTr();
  const rule = createSchemaFieldRule(createGeneralInfoSchema(t));
  const dispatch = useAppDispatch();
  const state = useAppState();
  const router = useRouter();
  const serviceName = useSearchParams().get('service-name');
  const { data: service, isPending: isPendingService } = useGetService();
  const { data: tags, isFetching: isFetchingTags } = useGetTags();
  const selectedTags = Form.useWatch(FORM_ITEM_NAMES.tags, form);
  const { data: categories, isFetching: isFetchingCategories } = useGetCategories();
  const { data: serviceAccesses, isFetching: isFetchingServiceAccesses } = useGetServiceAccess();
  const { data: throughputs, isFetching: isFetchingThroughput } = useGetThroughput();
  const { mutate: postGeneralInfo } = usePostGeneralInfoMutation();
  const [isConfirmModalOpen, toggleConfirmModal] = useToggle(false);
  const isInSSO = service?.isInSSO;

  const onFinish: FormProps<GeneralInfoValuesType>['onFinish'] = (values) => {
    const { throughput, category, tags: formTags, owner, access, version, englishName, persianName } = values;

    if (!throughputs || !serviceAccesses || !category || !tags || !categories) return;

    const currentThroughput = findInList(throughputs, throughput);
    const currentServiceAccess = findInList(serviceAccesses, access);
    const currentCategory = findInList(categories, category);

    if (!currentThroughput || !currentServiceAccess || !currentCategory) return;

    postGeneralInfo(
      {
        persianName,
        version,
        ownerName: owner,
        tagsIds: formTags.map((tag) => tag.value),
        categoryCode: currentCategory.code,
        throughput: currentThroughput,
        latinName: englishName,
        accessLevel: currentServiceAccess,
      },
      {
        onSuccess: () => nextStep(dispatch),
      }
    );
  };

  const onReturn = () => {
    router.back();
  };

  const onRegister = () => {
    if (isInSSO) form.submit();
    else toggleConfirmModal();
  };

  const closeChip = (tag: { key: number; label: string; value: number }) => {
    form.setFieldValue(
      FORM_ITEM_NAMES.tags,
      selectedTags?.filter((t) => t.value !== tag.value)
    );
  };

  if (isPendingService) {
    return <Loading />;
  }

  let initialValues: Partial<GeneralInfoValuesType> = { englishName: serviceName! };
  if (service) {
    const { name, tags, owner, version, category, throughput, accessLevel, persianName } = service;
    initialValues = {
      tags: convertTags(tags),
      owner,
      version,
      access: accessLevel.code,
      category: category?.code,
      throughput: throughput.code,
      englishName: name,
      persianName,
    };
  }

  const inputErrors = state.stepStatuses.find((i) => i.name === 'generalInfo')?.error;
  const getValidateStatus = (name: string) => (inputErrors?.[name] ? 'error' : undefined);

  return (
    <>
      <Container>
        <Form layout={'vertical'} initialValues={initialValues} onFinish={onFinish} form={form}>
          <S.InputsBox>
            <SearchItemsContainer $columnNumber='3'>
              <FormItem
                validateStatus={getValidateStatus(FORM_ITEM_NAMES.englishName)}
                name={FORM_ITEM_NAMES.englishName}
                label={t('english_name')}
                rules={[rule]}
              >
                <Input disabled={true} placeholder={t('enter_english_name')} />
              </FormItem>

              <FormItem
                name={FORM_ITEM_NAMES.persianName}
                label={t('persian_name')}
                rules={[rule]}
                validateStatus={getValidateStatus(FORM_ITEM_NAMES.persianName)}
              >
                <Input placeholder={t('enter_persian_name')} />
              </FormItem>

              <FormItem
                validateStatus={getValidateStatus(FORM_ITEM_NAMES.access)}
                name={FORM_ITEM_NAMES.access}
                rules={[rule]}
                label={t('access')}
              >
                <Select
                  size={'large'}
                  placeholder={t('select_access')}
                  loading={isFetchingServiceAccesses}
                  options={convertCodeTitles(serviceAccesses)}
                />
              </FormItem>

              <FormItem
                name={FORM_ITEM_NAMES.category}
                validateStatus={getValidateStatus(FORM_ITEM_NAMES.category)}
                rules={[rule]}
                label={t('category')}
              >
                <Select
                  size={'large'}
                  loading={isFetchingCategories}
                  placeholder={t('select_categroy')}
                  options={convertCodeTitles(categories)}
                />
              </FormItem>

              <FormItem
                name={FORM_ITEM_NAMES.throughput}
                validateStatus={getValidateStatus(FORM_ITEM_NAMES.throughput)}
                rules={[rule]}
                label={t('throughput')}
              >
                <Select
                  size={'large'}
                  placeholder={t('throughput')}
                  loading={isFetchingThroughput}
                  options={convertCodeTitles(throughputs)}
                />
              </FormItem>

              <FormItem
                name={FORM_ITEM_NAMES.version}
                validateStatus={getValidateStatus(FORM_ITEM_NAMES.version)}
                label={t('version')}
                rules={[rule]}
              >
                <Input placeholder={t('enter_version')} />
              </FormItem>

              <FormItem
                name={FORM_ITEM_NAMES.owner}
                validateStatus={getValidateStatus(FORM_ITEM_NAMES.owner)}
                label={t('owner')}
                rules={[rule]}
              >
                <Input placeholder={t('enter_owner')} />
              </FormItem>
            </SearchItemsContainer>
          </S.InputsBox>

          <Box>
            <S.TagPicker>
              <FormItem name={FORM_ITEM_NAMES.tags} rules={[rule]}>
                <Dropdown.Select multiSelect loading={isFetchingTags} menu={convertTags(tags)}>
                  {t('add_tags')}
                </Dropdown.Select>
              </FormItem>

              {selectedTags?.map((item) => (
                <Chip
                  ellipsis
                  closeIcon
                  type='active'
                  key={item.key}
                  tooltipOnEllipsis
                  tooltipTitle={item.label}
                  onClose={() => closeChip(item)}
                >
                  {item.label}
                </Chip>
              ))}
            </S.TagPicker>
          </Box>
        </Form>

        <Footer onRegister={onRegister} onReturn={onReturn} />
      </Container>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        toggle={toggleConfirmModal}
        onConfirm={() => form.submit()}
        fieldName={t('service_name')}
      />
    </>
  );
}
