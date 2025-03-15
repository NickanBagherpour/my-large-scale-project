import { Form } from 'antd';
import { TagPicker } from '@oxygen/reusable-components';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';

const TagPickerContainer = (props) => {
  const { GrantValue, loadingUpdateClient, isSuccess, isTagsFetching, tags, t, rule } = props;

  return (
    <>
      <Form.Item name={FORM_ITEM_NAMES.grantType} rules={[rule]}>
        <TagPicker
          dropdownMinWidth={'20rem'}
          isLoading={loadingUpdateClient || isSuccess}
          title={t('form.grant_type')}
          menu={GrantValue}
        />
      </Form.Item>

      <Form.Item name={FORM_ITEM_NAMES.tags} rules={[rule]}>
        <TagPicker
          dropdownMinWidth={'20rem'}
          isLoading={isTagsFetching || loadingUpdateClient || isSuccess}
          menu={tags}
          title={t('form.add_tags')}
        />
      </Form.Item>
    </>
  );
};

export default TagPickerContainer;
