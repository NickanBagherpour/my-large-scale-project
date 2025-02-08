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

export const prepareParams = (item) => {
  const obj: any = {};

  if (item.latinNameClient) {
    obj.clientEnglishName = item.latinNameClient;
  }

  if (item.persianNameClient) {
    obj.clientPersianName = item.persianNameClient;
  }

  if (item.clientId) {
    obj.clientKey = item.clientId;
  }

  if (item.clientType) {
    obj.clientTypeCode = item.clientType;
  }

  if (item.identityAuth) {
    obj.authorizationKey = item.identityAuth;
  }

  if (item.websiteUrl) {
    obj.websiteUrl = item.websiteUrl;
  }

  if (item.inputAddress) {
    obj.inboundAddress = item.inputAddress;
  }

  if (item.returnAddress) {
    obj.redirectUrl = item.returnAddress;
  }

  if (item.identityAuth) {
    obj.authorizationKey = item.identityAuth;
  }

  const grantType = transformData(item.grantType);

  const extractKeys = (data) => data.map((item) => item.key);

  obj.tagIds = Array.isArray(item.tags) ? extractKeys(item.tags) : [];

  return { ...obj, ...grantType };
};

export const prepareGrantTypes = (userData, GrantValue) => {
  const activeFlows = getActiveFlow(userData);
  return GrantValue.filter((item) => activeFlows.includes(item.key));
};

export const prepareTags = (tags, tagIds) => {
  const selectedTagCodes = tagIds.map((item) => item.code);

  return tags.filter((tag) => selectedTagCodes.includes(tag.key)) || [];
};
