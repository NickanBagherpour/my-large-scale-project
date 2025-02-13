export function isExcel(data: { file } | null): boolean {
  const name = data?.file.name;
  if (!name) return false;

  const validExtensions = ['xls', 'xlsx'];
  const extension = name.split('.').at(-1);

  return !!extension && validExtensions.includes(extension);
}
