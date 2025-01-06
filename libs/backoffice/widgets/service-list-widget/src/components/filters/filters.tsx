import { useState } from 'react';
import { useTr } from '@oxygen/translation';
import { Chip } from '@oxygen/ui-kit';
import { useBounce, useToggle } from '@oxygen/hooks';
import { updateSearchTerm, updateSort, updateStatus, useAppDispatch, useAppState } from '../../context';
import { WidgetStateType } from '../../context/types';
import UploadService from '../upload-service/upload-service';
import InquiryService from '../service-inquiry/inquiry-service';
import * as S from './filters.sytle';

type Status = WidgetStateType['status'];
type Sort = WidgetStateType['sort'];

function getChipType(currentStatus: Status, chipStatus: Status) {
  return currentStatus === chipStatus ? 'active' : 'unActive';
}

export default function Filters() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { status, sort } = useAppState();
  const [value, setValue] = useState('');
  const [isUploadModalOpen, toggleUploadModal] = useToggle(false);
  const [isInquiryModalOpen, toggleInquiryModal] = useToggle(false);

  useBounce(() => {
    updateSearchTerm(dispatch, value?.trim());
  }, [value]);

  return (
    <>
      <S.Container>
        <S.Actions>
          <S.Input
            value={value}
            placeholder={t('search_by_name_or_scope')}
            prefix={<i className='icon-search-normal' />}
            onChange={(e) => setValue(e.target.value)}
          />

          <S.Buttons>
            {/* <S.Button onClick={toggleUploadModal} color='primary' variant='outlined'>
              {t('upload_service')}
            </S.Button> */}
            <S.Button onClick={toggleInquiryModal} color='primary' variant='solid'>
              {t('create_new_service')}
            </S.Button>
          </S.Buttons>
        </S.Actions>

        <S.Indicators>
          <S.Chips>
            <Chip
              iconProp={status == null ? 'checked icon-checkmark' : undefined}
              type={getChipType(status, null)}
              onClick={() => updateStatus(dispatch, null)}
            >
              {t('all_services')}
            </Chip>

            <S.Divider type='vertical' />

            <Chip
              iconProp={status === true ? 'checked icon-checkmark' : undefined}
              type={getChipType(status, true)}
              onClick={() => updateStatus(dispatch, true)}
            >
              {t('operational_services')}
            </Chip>

            <Chip
              iconProp={status === false ? 'checked icon-checkmark' : undefined}
              type={getChipType(status, false)}
              onClick={() => updateStatus(dispatch, false)}
            >
              {t('stopped_services')}
            </Chip>
          </S.Chips>

          <S.FilterPopover
            filters={[
              { key: 'ascending', title: t('ascending'), icon: 'icon-arrow-ascending' },
              { key: 'descending', title: t('descending'), icon: 'icon-arrow-descending' },
            ]}
            initialValue={sort}
            onChange={(value) => updateSort(dispatch, value as Sort)}
          />
        </S.Indicators>
      </S.Container>
      {isUploadModalOpen && <UploadService toggle={toggleUploadModal} isOpen={isUploadModalOpen} />}
      {isInquiryModalOpen && <InquiryService toggle={toggleInquiryModal} isOpen={isInquiryModalOpen} />}
    </>
  );
}
