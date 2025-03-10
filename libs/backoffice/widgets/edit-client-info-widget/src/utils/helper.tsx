import { GrantValue, nonExistentNationalId } from './consts';
import { Chip } from '@oxygen/ui-kit';

const transformData = (data) => {
  return GrantValue.reduce((acc, item) => {
    acc[`is${item.code}`] = data.some((d) => d.code === item.code);
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

export const prepareParams = (item, OrganizationNationalId) => {
  const obj: any = {};

  if (item.englishNameClient) {
    obj.clientEnglishName = item.englishNameClient;
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

  obj.organizationNationalId = OrganizationNationalId ?? nonExistentNationalId;

  const grantType = transformData(item.grantType);

  const extractKeys = (data) => data.map((item) => item.code);

  obj.tagIds = Array.isArray(item.tags) ? extractKeys(item.tags) : [];

  return { ...obj, ...grantType };
};

export const convertApi = (data) => {
  const filteredData = {};

  const activeTagIds =
    data.tagIds.map((tag) => ({
      code: tag.code,
      title: tag.title,
    })) ?? [];

  const activeGrantType =
    Object.entries(data)
      .filter(([key, value]) => key.startsWith('is') && value === true)
      .map(([key]) => ({
        code: key.replace(/^is/, ''),
        title: key.replace(/^is/, ''),
      })) ?? [];

  for (const key in data) {
    if (!key.startsWith('is') && key !== 'tagIds') {
      filteredData[key] = data[key];
    }
  }

  return {
    ...filteredData,
    activeTagIds,
    activeGrantType,
  };
};
