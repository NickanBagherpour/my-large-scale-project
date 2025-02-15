export const isFileInValid = (file: File, notification, t) => {
  const isValidType = [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ].includes(file.type);

  const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB in bytes

  if (!isValidType) {
    notification.error({ message: t('file_format_error') });
    return true;
  }

  if (!isValidSize) {
    notification.error({ message: t('file_size_limit_error') });
    return true;
  }

  return false;
};
