import { Input, Loading, SearchItemsContainer, Select } from '@oxygen/ui-kit';
import { Form, type FormProps } from 'antd';
import { FORM_ITEM_NAMES } from '../../utils/consts';
import { useTr } from '@oxygen/translation';
import { createGeneralInfoSchema, GeneralInfoValuesType } from '../../types';
import { createSchemaFieldRule } from 'antd-zod';
import { updateGetInfoStep, nextStep, useAppDispatch, initialStateValue } from '../../context';
import Footer from '../footer/footer';
import Box from '../box/box';
import FormItem from '../form-item/form-item';
import { useRouter } from 'next/navigation';
import { Container } from '../container/container.style';
import { useGetService } from '../../services';
import { usePostServiceMutation } from '../../services/post-service.api';

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

  const onFinish: FormProps<GeneralInfoValuesType>['onFinish'] = async (values) => {
    const { throughout, category, tag, owner, access, version, englishName, persianName } = values;
    try {
      // @ts-expect-error this will be fixed by backend later
      // prettier-ignore
      await postService({ persianName, version, owner, tag, category, throughout, name: englishName, accessLevel: access });
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
      const { name, tag, owner, version, category, throughout, accessLevel, persianName } = data.data;
      initialValues = {
        tag,
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
            <SearchItemsContainer>
              <FormItem name={FORM_ITEM_NAMES.englishName} className='span-2' label={t('english_name')} rules={[rule]}>
                <Input placeholder={t('enter_english_name')} />
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
      </Container>
    );
  } else return 'something went wrong';
}
