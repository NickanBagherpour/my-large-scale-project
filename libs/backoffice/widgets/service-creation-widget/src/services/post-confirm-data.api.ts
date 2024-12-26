import { useMutation } from '@tanstack/react-query';
import { addStepErrors, updateMessageAction, useAppDispatch, useAppState, WidgetStateType } from '../context';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { GeneralInfoValuesType, RouteType } from '../types';
import { type AxiosError } from 'axios';
import { isAxiosError } from '../utils/error-util';

const errorsMap = {
  'service.name': 'englishName',
  'service.throughput': 'throughput',
  'service.version': 'version',
  'service.owner': 'owner',
  'route.method': 'actionOrMethod',
  'route.protocol': 'protocol',
  'route.path': 'path',
  'route.host': 'host',
} satisfies Record<string, keyof GeneralInfoValuesType | keyof RouteType>;

type Keys = keyof typeof errorsMap;

type PublisherErrorResponse = {
  responseCode: string;
  message: string;
  detail: string;
  LocalDateTime: string;
  errors: Partial<Record<Keys, string>>;
};

function isPublisherError(err: AxiosError): err is AxiosError<PublisherErrorResponse> {
  return 'errors' in err && typeof err.errors === 'object';
}

export const usePostConfirmData = () => {
  const dispatch = useAppDispatch();
  const { serviceName } = useAppState();
  return useMutation({
    mutationFn: () => Api.postCofirmData(serviceName),
    onError: (e) => {
      const err = ApiUtil.getErrorMessage(e);
      updateMessageAction(dispatch, err);
      if (isAxiosError(e) && isPublisherError(e)) {
        // const errorsObj: PublisherErrorResponse['errors'] = {
        // 	'service.name': 'serviceName error',
        // 	'route.host': 'host error',
        // };
        const errorsObj = e?.response?.data?.errors;
        if (errorsObj) {
          const stepErrors = Object.entries(errorsObj).reduce(
            (acc, [key, value]) => ({ ...acc, [errorsMap[key]]: value }),
            {} as WidgetStateType['stepErrors']
          );
          addStepErrors(dispatch, stepErrors);
        }
      }
    },
  });
};
