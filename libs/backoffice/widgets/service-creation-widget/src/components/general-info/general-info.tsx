import { Input, Select, Chip, Dropdown } from '@oxygen/ui-kit';
import { Form, type FormProps } from 'antd';
import { SERVICE_NAMES } from '../../utils/consts';
import { useTr } from '@oxygen/translation';
import { CodeTitle, createGeneralInfoSchema, GeneralInfoValuesType } from '../../types';
import { createSchemaFieldRule } from 'antd-zod';
import { nextStep, useAppDispatch, useAppState } from '../../context';
import Footer from '../footer/footer';
import Box from '../box/box';
import FormItem from '../form-item/form-item';
import { useRouter } from 'next/navigation';
import { Container } from '../container/container.style';
import {
  useGetCategories,
  useGetService,
  useGetServiceAccess,
  useGetTags,
  useGetThroughput,
  usePostService,
} from '../../services';
import { convertCodeTitles, convertTags } from '../../utils/convert-enums';
import CenteredLoading from '../centered-loading/centered-loading';
import * as S from './general-info.style';

const findInList = (list: CodeTitle[], code: number) => list.find((item) => item.code === code);

export default function GeneralInfo() {
  const [form] = Form.useForm<GeneralInfoValuesType>();
  const [t] = useTr();
  const rule = createSchemaFieldRule(createGeneralInfoSchema(t));
  const dispatch = useAppDispatch();
  const state = useAppState();
  const router = useRouter();
  const { data: service, isPending: isPendingService } = useGetService();
  const { data: tags, isFetching: isFetchingTags } = useGetTags();
  const selectedTags = Form.useWatch(SERVICE_NAMES.tags, form);
  const { data: categories, isFetching: isFetchingCategories } = useGetCategories();
  const { data: serviceAccesses, isFetching: isFetchingServiceAccesses } = useGetServiceAccess();
  const { data: throughputs, isFetching: isFetchingThroughput } = useGetThroughput();
  const { mutate: postService } = usePostService();

  const onFinish: FormProps<GeneralInfoValuesType>['onFinish'] = (values) => {
    const { throughput, category, tags: formTags, owner, access, version, englishName, persianName } = values;

    if (!throughputs || !serviceAccesses || !category || !tags || !categories) return;

    const currentThroughput = findInList(throughputs, throughput);
    const currentServiceAccess = findInList(serviceAccesses, access);
    const currentCategory = findInList(categories, category);

    if (!currentThroughput || !currentServiceAccess || !currentCategory) return;

    postService(
      {
        persianName,
        version,
        ownerName: owner,
        tagsIds: formTags.map((tag) => tag.value),
        categoryCode: currentCategory.code,
        throughput: currentThroughput,
        englishName: englishName,
        accessLevel: currentServiceAccess,
      },
      {
        onSuccess: () => nextStep(dispatch),
      }
    );
  };

  const onReturn = () => router.back();

  const onRegister = () => form.submit();

  const closeChip = (tag: { key: number; label: string; value: number }) => {
    form.setFieldValue(
      SERVICE_NAMES.tags,
      selectedTags?.filter((t) => t.value !== tag.value)
    );
  };

  if (isPendingService) {
    return <CenteredLoading />;
  }

  // Disabled the "throughput" and "access" selects as per the request of the analytics team.
  // Set their values to 1 by default. This behavior might change later.
  let initialValues: Partial<GeneralInfoValuesType> = { englishName: state.serviceName, throughput: 1, access: 1 };
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
  const getErrorMsg = (name: string) => inputErrors?.[name] ?? undefined;

  return (
    <Container>
      <Form layout={'vertical'} initialValues={initialValues} onFinish={onFinish} form={form}>
        <S.InputsBox>
          <S.Grid>
            <FormItem
              validateStatus={getValidateStatus(SERVICE_NAMES.englishName)}
              help={getErrorMsg(SERVICE_NAMES.englishName)}
              name={SERVICE_NAMES.englishName}
              label={t('english_name')}
              rules={[rule]}
            >
              <Input disabled={true} placeholder={t('enter_english_name')} />
            </FormItem>

            <FormItem
              name={SERVICE_NAMES.persianName}
              label={t('persian_name')}
              rules={[rule]}
              validateStatus={getValidateStatus(SERVICE_NAMES.persianName)}
              help={getErrorMsg(SERVICE_NAMES.persianName)}
            >
              <Input placeholder={t('enter_persian_name')} />
            </FormItem>

            <FormItem
              validateStatus={getValidateStatus(SERVICE_NAMES.access)}
              help={getErrorMsg(SERVICE_NAMES.access)}
              name={SERVICE_NAMES.access}
              rules={[rule]}
              label={t('access')}
            >
              <Select
                disabled
                size={'large'}
                placeholder={t('select_access')}
                loading={isFetchingServiceAccesses}
                options={convertCodeTitles(serviceAccesses)}
              />
            </FormItem>

            <FormItem
              name={SERVICE_NAMES.category}
              validateStatus={getValidateStatus(SERVICE_NAMES.category)}
              help={getErrorMsg(SERVICE_NAMES.category)}
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
              name={SERVICE_NAMES.throughput}
              validateStatus={getValidateStatus(SERVICE_NAMES.throughput)}
              help={getErrorMsg(SERVICE_NAMES.throughput)}
              rules={[rule]}
              label={t('throughput')}
            >
              <Select
                disabled
                size={'large'}
                placeholder={t('throughput')}
                loading={isFetchingThroughput}
                options={convertCodeTitles(throughputs)}
              />
            </FormItem>

            <FormItem
              name={SERVICE_NAMES.version}
              validateStatus={getValidateStatus(SERVICE_NAMES.version)}
              help={getErrorMsg(SERVICE_NAMES.version)}
              label={t('version')}
              rules={[rule]}
            >
              <Input placeholder={t('enter_version')} />
            </FormItem>

            <FormItem
              name={SERVICE_NAMES.owner}
              validateStatus={getValidateStatus(SERVICE_NAMES.owner)}
              help={getErrorMsg(SERVICE_NAMES.owner)}
              label={t('owner')}
              rules={[rule]}
            >
              <Input placeholder={t('enter_owner')} />
            </FormItem>
          </S.Grid>
        </S.InputsBox>

        <Box>
          <S.TagPicker>
            <FormItem name={SERVICE_NAMES.tags} rules={[rule]}>
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
  );
}
