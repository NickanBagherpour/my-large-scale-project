import { GrantValue } from './consts';
import { Chip } from '@oxygen/ui-kit';

const transformData = (data) => {
  return GrantValue.reduce((acc, item) => {
    acc[`is${item.key}`] = data.some((d) => d.key === item.key);
    return acc;
  }, {});
};

export const renderChip = (tag, handleClose) => (
  <Chip
    key={tag.key}
    tooltipTitle={tag.label}
    ellipsis={true}
    tooltipOnEllipsis={true}
    type='active'
    closeIcon
    onClose={() => handleClose?.(tag.key)}
  >
    <span>{tag.label}</span>
  </Chip>
);

export const getActiveFlow = (data) => {
  return Object.entries(data)
    .filter(([key, value]) => key.startsWith('is') && value === true)
    .map(([key]) => key.replace(/^is/, ''));
};

export const prepareSubmitClientParams: any = (item, orgId, ssoId) => {
  const params = {
    ssoClientId: ssoId,
    clientEnglishName: item.clientEnglishName,
    clientPersianName: item.clientPersianName,
    clientTypeCode: item.clientTypeCode,
    clientKey: item.clientKey,
    authorizationKey: item.authorizationKey,
    websiteUrl: item.websiteUrl === '' ? null : item.websiteUrl,
    inboundAddress: item.inboundAddress === '' ? null : item.inboundAddress,
    redirectUrl: item.redirectUrl === '' ? null : item.redirectUrl,
    description: item.description === '' ? null : item.description,
    organizationNationalId: orgId,
    tagIds: item.tagIds.length ? item.tagIds.map((tag) => tag.key) : [],
  };
  const grantType = transformData(item.grantType);

  return { ...params, ...grantType };
};

// utils/prepareClientData.ts
export const prepareGrantTypes = (userData, GrantValue) => {
  const activeFlows = getActiveFlow(userData);
  return GrantValue.filter((item) => activeFlows.includes(item.key));
};

export const prepareTags = (tags, tagIds) => {
  return tags.filter((tag) => tagIds?.includes(tag.key)) || [];
};
