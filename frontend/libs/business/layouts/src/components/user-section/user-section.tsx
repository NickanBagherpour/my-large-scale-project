import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tooltip } from 'antd';

import { LocalStorageKey } from '@oxygen/types';
import { useAuth, useLocalStorage, useMenu } from '@oxygen/hooks';
import { Avatar, Box, Button, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import { Api } from '../../services';
import ChangeOrganizationModal from '../change-organization-modal/change-organization-modal';
import { defaultUserPhoto } from '../../assets/mock/data';

import * as S from './user-section.style';

export type DrawerProps = {
  onToggleDrawer?: React.MouseEventHandler;
  children?: React.ReactNode;
  onBreakpoint?: (broken: boolean) => void;
  onClose?: () => void;
};

const UserSection = (props: DrawerProps) => {
  const router = useRouter();
  const [t] = useTr();
  const { removeMenu } = useMenu();
  const { user, userPhoto, setUserPhoto, isAuth } = useAuth();
  const [userOrg, setUserOrg, removeUserOrg] = useLocalStorage<any>(LocalStorageKey.USER_ORG);
  const [orgLoading, setOrgLoading] = useState<boolean>(false);
  const [openChangeOrgModal, setOpenChangeOrgModal] = useState(false);

  useEffect(() => {
    if (userPhoto) {
      return;
    }

    Api.getUserPhoto()
      .then((res) => {
        if (res?.photo) {
          setUserPhoto(`data:image/png;base64,${res?.photo}`);
        }
      })
      .catch((err) => {
        console.error('getUserPhoto err', err);
      });
    // .finally(() => {});
  }, []);

  useEffect(() => {
    if (userOrg) {
      return;
    }

    setOrgLoading(true);

    Api.getUserOrg()
      .then((res) => {
        setUserOrg(res);
      })
      .catch((err) => {
        console.error('getUserOrg err', err);
      })
      .finally(() => {
        setOrgLoading(false);
      });
  }, []);

  const getUserFullName = () => {
    if (!user) {
      return '-';
    }

    const value = `${user.userInfo.firstName} ${user.userInfo.lastName}`;
    const open = value?.length < 30 ? false : undefined;
    return (
      <Tooltip title={value} placement={'top'} open={open} mouseEnterDelay={1}>
        {value}
      </Tooltip>
    );
  };

  const getUserPhotoUrl = () => userPhoto ?? defaultUserPhoto;

  const getOrgTitle = () => {
    const value = userOrg?.currentOrganization?.nameFa;

    const tooltip = (
      <>
        <div>{userOrg?.currentOrganization?.nameFa}</div>
        <div>
          {t('field.org_ssn')} : {userOrg?.currentOrganization?.ssn}
        </div>
      </>
    );
    // const open = value?.length < 30 ? false : undefined;
    return (
      <Tooltip title={tooltip} placement={'bottom'} /*open={open}*/ mouseEnterDelay={0.5}>
        {value}
      </Tooltip>
    );
  };

  const handleChangeOrgClick = () => {
    setOpenChangeOrgModal(true);
  };

  const handleChangeOrgCancel = () => {
    setOpenChangeOrgModal(false);
  };

  const handleUserProfileClick = () => {
    router.push('profile');
  };

  const handleChangeOrgConfirm = () => {
    setOpenChangeOrgModal(false);
    removeMenu();
    removeUserOrg();
    router.refresh();
  };

  return (
    <>
      <S.UserProfileWrapper>
        <section className={'user-section'}>
          <div className='user-section__top-row'>
            <div className={'user-avatar-container'}>
              <Avatar size={60} icon={<i className='ri-user-3-fill' />} src={getUserPhotoUrl()} />
            </div>

            <div className='user-info'>
              <div className='user-profile-name'>{getUserFullName()}</div>
              <div className='user-profile-organization-container'>
                {orgLoading ? (
                  <Loading containerProps={{ width: 'min-content' }} />
                ) : (
                  <span className='user-organization-title'>{getOrgTitle() || '_'}</span>
                )}
              </div>
            </div>
          </div>
          <div className='user-section__bottom-row'>
            <Button size='middle' onClick={handleChangeOrgClick}>
              {t('button.change_org')}
            </Button>
            <Button size='middle' type='primary' onClick={handleUserProfileClick}>
              {t('button.display_profile')}
            </Button>
          </div>
        </section>
      </S.UserProfileWrapper>
      {openChangeOrgModal && (
        <ChangeOrganizationModal
          open={openChangeOrgModal}
          userOrganizationData={userOrg}
          onCancel={handleChangeOrgCancel}
          onConfirm={handleChangeOrgConfirm}
        />
      )}
    </>
  );
};

export default UserSection;
