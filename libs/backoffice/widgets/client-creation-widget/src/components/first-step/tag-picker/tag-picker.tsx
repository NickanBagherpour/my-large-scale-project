import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';

import { FORM_ITEM } from '../../../utils/consts';
import { createFormSchema } from '../../../types';
import { renderChip } from '../../../utils/helper';

import * as S from './tag-picker.style';

const TagPicker = (props) => {
  const {
    isDisabled,
    tags,
    isTagsFetching,
    selectedTags,
    onTagsChange,
    onTagsClose,
    isSuccess,
    GrantValue,
    selectedGrantTypes,
    onGrantTypeChange,
    onGrantTypeClose,
    loadingUpdateClient,
    isAuthorizationFlowSelected,
  } = props;
  const [t] = useTr();
  const rule = createSchemaFieldRule(createFormSchema(t, isAuthorizationFlowSelected));

  return (
    <>
      <S.TagPicker>
        <Form.Item name={FORM_ITEM.GRANT_TYPE} rules={[rule]}>
          <S.Select
            disabled={loadingUpdateClient || isSuccess || isDisabled}
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
        <Form.Item name={FORM_ITEM.TAG_IDS}>
          <S.Select
            loading={isTagsFetching}
            disabled={loadingUpdateClient || isSuccess || isDisabled}
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
