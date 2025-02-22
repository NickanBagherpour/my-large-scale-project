import { Form } from 'antd';
import * as S from '../edit-client/edit-client.style';
import { renderChip } from '../../utils/helper';

const TagPicker = (props) => {
  const {
    onTagsClose,
    onGrantTypeClose,
    GrantValue,
    selectedGrantTypes,
    selectedTags,
    onGrantTypeChange,
    onTagsChange,
    loadingUpdateClient,
    isSuccess,
    isTagsFetching,
    tags,
    t,
    rule,
  } = props;

  return (
    <>
      <S.TagPicker>
        <Form.Item name='grantType' rules={[rule]}>
          <S.Select
            disabled={loadingUpdateClient || isSuccess}
            menu={GrantValue}
            multiSelect={true}
            onChange={onGrantTypeChange}
          >
            {t('form.grant_type')}
          </S.Select>
        </Form.Item>
        <div>{selectedGrantTypes.map((tag) => renderChip(tag, onGrantTypeClose))}</div>
      </S.TagPicker>

      <S.TagPicker>
        <Form.Item name='tags' rules={[rule]}>
          <S.Select
            loading={isTagsFetching}
            disabled={loadingUpdateClient || isSuccess}
            menu={tags}
            multiSelect={true}
            onChange={onTagsChange}
          >
            {t('form.add_tags')}
          </S.Select>
        </Form.Item>
        <div>{selectedTags.map((tag) => renderChip(tag, onTagsClose))}</div>
      </S.TagPicker>
    </>
  );
};

export default TagPicker;
