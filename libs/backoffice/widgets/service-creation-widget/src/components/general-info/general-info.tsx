import { Input, Loading, SearchItemsContainer, Select, Chip, Dropdown } from '@oxygen/ui-kit';
import { Form, type FormProps } from 'antd';
import { FORM_ITEM_NAMES } from '../../utils/consts';
import { useTr } from '@oxygen/translation';
import { createGeneralInfoSchema, GeneralInfoValuesType, Tags } from '../../types';
import { createSchemaFieldRule } from 'antd-zod';
import { updateGetInfoStep, nextStep, useAppDispatch, initialStateValue } from '../../context';
import Footer from '../footer/footer';
import Box from '../box/box';
import FormItem from '../form-item/form-item';
import { useRouter } from 'next/navigation';
import { Container } from '../container/container.style';
import { useGetService, useGetTags } from '../../services';
import { usePostServiceMutation } from '../../services/post-service.api';
import * as S from './general-info.style';
import { use, useEffect, useState } from 'react';

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
  const router = useRouter();
  const { data, isFetching, is404Error } = useGetService();
  const { mutateAsync: postService } = usePostServiceMutation();
  const { data: tags, isFetching: isFetchingTags } = useGetTags();
  const [selectedTags, setSelectedTags] = useState<Tags>([]);

  useEffect(() => {
    console.log(':)', 'useEffect', selectedTags);
  }, [selectedTags]);

  const onFinish: FormProps<GeneralInfoValuesType>['onFinish'] = async (values) => {
    const { throughout, category, tags, owner, access, version, englishName, persianName } = values;
    try {
      // @ts-expect-error this will be fixed by backend later
      // prettier-ignore
      await postService({ persianName, version, owner, tags, category, throughout, name: englishName, accessLevel: access });
      nextStep(dispatch);
      updateGetInfoStep(dispatch, values);
    } catch {
      //
    }
  };

  const onReturn = () => {
    router.back();
  };

  if (isFetching) {
    return <Loading />;
  }

  if (data || is404Error) {
    let initialValues = initialStateValue['generalInfo'];
    if (data) {
      const { name, tags, owner, version, category, throughout, accessLevel, persianName } = data.data;
      initialValues = {
        tags,
        owner,
        version,
        access: String(accessLevel), // todo: backend will send strings for these values later
        category: String(category),
        throughout: String(throughout),
        englishName: name,
        persianName,
      };
    }

    return (
      <Container>
        <Box>
          <Form layout={'vertical'} initialValues={initialValues} onFinish={onFinish} form={form}>
            <SearchItemsContainer $columnNumber='3'>
              <FormItem name={FORM_ITEM_NAMES.englishName} label={t('english_name')} rules={[rule]}>
                <Input placeholder={t('enter_english_name')} />
              </FormItem>

              <FormItem name={FORM_ITEM_NAMES.persianName} label={t('persian_name')} rules={[rule]}>
                <Input placeholder={t('enter_persian_name')} />
              </FormItem>

              <FormItem name={FORM_ITEM_NAMES.access} rules={[rule]} label={t('access')}>
                <Select size={'large'} placeholder={t('select_access')} options={options}></Select>
              </FormItem>

              <FormItem name={FORM_ITEM_NAMES.category} rules={[rule]} label={t('category')}>
                <Select size={'large'} placeholder={t('select_categroy')} options={options}></Select>
              </FormItem>

              <FormItem name={FORM_ITEM_NAMES.throughout} rules={[rule]} label={t('throughout')}>
                <Select size={'large'} placeholder={t('throughout')} options={options}></Select>
              </FormItem>

              <FormItem name={FORM_ITEM_NAMES.version} label={t('version')} rules={[rule]}>
                <Input placeholder={t('enter_version')} />
              </FormItem>

              <FormItem name={FORM_ITEM_NAMES.owner} label={t('owner')} rules={[rule]}>
                <Input placeholder={t('enter_owner')} />
              </FormItem>
            </SearchItemsContainer>
          </Form>
        </Box>

        <Box>
          <S.TagPicker>
            <Form.Item className={'tag-input-grant-tag'} name={FORM_ITEM_NAMES.tags}>
              <Dropdown.Select
                loading={isFetchingTags}
                multiSelect={true}
                onChange={(tags: any) => {
                  console.log(':)', 'tags', tags);
                  setSelectedTags(tags);
                }}
                menu={tags?.map((item) => ({ key: item.id, label: item.title, value: item.id }))}
                value={selectedTags as any} // you are not supposed to pass a value to this because Form.Item passes overrides the value, you must let Ant's Form.Item take care of the state, then watch the form value.
              >
                {t('add_tags')}
              </Dropdown.Select>
            </Form.Item>

            <div>
              {selectedTags.map((item: any) => (
                <Chip
                  key={item?.key}
                  tooltipTitle={item?.label}
                  ellipsis={true}
                  tooltipOnEllipsis={true}
                  type='active'
                  closeIcon
                  onClose={() =>
                    setSelectedTags((prev) =>
                      prev.some((tag) => tag.id === item.id)
                        ? prev.filter((tag) => tag.id === item.id)
                        : prev.concat(item)
                    )
                  }
                >
                  <span>{item.label}</span>
                </Chip>
              ))}
            </div>
          </S.TagPicker>
        </Box>

        <Footer onRegister={form.submit} onReturn={onReturn} />
      </Container>
    );
  } else return 'something went wrong';
}
