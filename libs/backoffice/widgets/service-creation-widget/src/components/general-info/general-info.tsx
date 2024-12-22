import { Input, Loading, SearchItemsContainer, Select, Chip, Dropdown } from '@oxygen/ui-kit';
import { Form, type FormProps } from 'antd';
import { FORM_ITEM_NAMES } from '../../utils/consts';
import { useTr } from '@oxygen/translation';
import { CodeTitle, createGeneralInfoSchema, GeneralInfoValuesType, Tags } from '../../types';
import { createSchemaFieldRule } from 'antd-zod';
import { updateGetInfoStep, nextStep, useAppDispatch, initialStateValue } from '../../context';
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

function convertTags(tags?: Tags) {
  return tags?.map((tag) => ({ key: tag.id, label: tag.title, value: tag.id })) ?? [];
}

function convertCodeTitles(items?: CodeTitle[]) {
  return items?.map(({ code, title }) => ({ label: title, value: code })) ?? [];
}

export default function GeneralInfo() {
  const [form] = Form.useForm<GeneralInfoValuesType>();
  const [t] = useTr();
  const rule = createSchemaFieldRule(createGeneralInfoSchema(t));
  const dispatch = useAppDispatch();
  const router = useRouter();
  const serviceName = useSearchParams().get('service-name');
  const { data: service, isFetching: isFetchingService, is404Error } = useGetService();
  const { data: tags, isFetching: isFetchingTags } = useGetTags();
  const selectedTags = Form.useWatch(FORM_ITEM_NAMES.tags, form);
  const { data: categories, isFetching: isFetchingCategories } = useGetCategories();
  const { data: serviceAccesses, isFetching: isFetchingServiceAccesses } = useGetServiceAccess();
  const { data: throughputs, isFetching: isFetchingThroughput } = useGetThroughput();
  const { mutateAsync: postGeneralInfo } = usePostGeneralInfoMutation();

  const onFinish: FormProps<GeneralInfoValuesType>['onFinish'] = async (values) => {
    const { throughput, category, tags, owner, access, version, englishName, persianName } = values;

    if (!throughputs || !serviceAccesses) return;

    const currentThroughputTitle = throughputs.find((t) => t.code === throughput)?.title;
    const currentServiceAccess = serviceAccesses.find((s) => s.code === access)?.title;

    if (!currentThroughputTitle || !currentServiceAccess) return;

    try {
      await postGeneralInfo({
        persianName,
        version,
        ownerName: owner,
        tagsIds: tags.map((t) => t.value),
        // @ts-expect-error asdf asdf asdf
        categoryCode: category,
        throughput: currentThroughputTitle,
        latinName: englishName,
        accessLevel: currentServiceAccess,
      });
      nextStep(dispatch);
      updateGetInfoStep(dispatch, values);
    } catch {
      //
    }
  };

  const onReturn = () => {
    router.back();
  };

  const closeChip = (tag: { key: number; label: string; value: number }) => {
    form.setFieldValue(
      FORM_ITEM_NAMES.tags,
      selectedTags?.filter((t) => t.value !== tag.value)
    );
  };

  if (isFetchingService) {
    return <Loading />;
  }

  if (service || is404Error) {
    let initialValues = { ...initialStateValue['generalInfo'], englishName: serviceName };
    if (service) {
      const { name, tags, owner, version, category, throughput, accessLevel, persianName } = service.data;
      initialValues = {
        tags: convertTags(tags),
        owner,
        version,
        access: accessLevel.code,
        category: category.code,
        throughput: throughput.code,
        englishName: name,
        persianName,
      };
    }

    return (
      <Container>
        <Form layout={'vertical'} initialValues={initialValues} onFinish={onFinish} form={form}>
          <S.InputsBox>
            <SearchItemsContainer $columnNumber='3'>
              <FormItem name={FORM_ITEM_NAMES.englishName} label={t('english_name')} rules={[rule]}>
                <Input disabled placeholder={t('enter_english_name')} />
              </FormItem>

              <FormItem name={FORM_ITEM_NAMES.persianName} label={t('persian_name')} rules={[rule]}>
                <Input placeholder={t('enter_persian_name')} />
              </FormItem>

              <FormItem name={FORM_ITEM_NAMES.access} rules={[rule]} label={t('access')}>
                <Select
                  size={'large'}
                  placeholder={t('select_access')}
                  loading={isFetchingServiceAccesses}
                  options={convertCodeTitles(serviceAccesses)}
                />
              </FormItem>

              <FormItem name={FORM_ITEM_NAMES.category} rules={[rule]} label={t('category')}>
                <Select
                  size={'large'}
                  loading={isFetchingCategories}
                  placeholder={t('select_categroy')}
                  options={convertCodeTitles(categories)}
                />
              </FormItem>

              <FormItem name={FORM_ITEM_NAMES.throughput} rules={[rule]} label={t('throughput')}>
                <Select
                  size={'large'}
                  placeholder={t('throughput')}
                  loading={isFetchingThroughput}
                  options={convertCodeTitles(throughputs)}
                />
              </FormItem>

              <FormItem name={FORM_ITEM_NAMES.version} label={t('version')} rules={[rule]}>
                <Input placeholder={t('enter_version')} />
              </FormItem>

              <FormItem name={FORM_ITEM_NAMES.owner} label={t('owner')} rules={[rule]}>
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

        <Footer onRegister={form.submit} onReturn={onReturn} />
      </Container>
    );
  } else return 'something went wrong';
}
