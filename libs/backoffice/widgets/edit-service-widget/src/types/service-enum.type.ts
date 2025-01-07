export type ServiceEnum<T, Y> = {
  code: T;
  title: Y;
};
export type AccessEnumType = ServiceEnum<1 | 2, 'PUBLIC' | 'PRIVATE'>;
export type ThroughputEnumType = ServiceEnum<1 | 2, 'SPECIFIED' | 'UNLIMITED'>;
export type CategoryType = ServiceEnum<number, string>;
