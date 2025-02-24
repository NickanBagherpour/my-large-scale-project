import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addStepErrors, ErrorPayload, StepNames, useAppDispatch, useAppState } from '../context';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { AxiosError, isAxiosError } from 'axios';
import { getErrorMsg } from '../utils/error-msg';
import { useTr } from '@oxygen/translation';
import { ErrorMsg } from '../types/shared.type';

const errorsMap = {
  'service.name': { stepName: 'generalInfo', inputName: 'englishName' },
  'service.throughput': { stepName: 'generalInfo', inputName: 'throughput' },
  'service.version': { stepName: 'generalInfo', inputName: 'version' },
  'service.owner': { stepName: 'generalInfo', inputName: 'owner' },
  'route.method': { stepName: 'route', inputName: 'methods' },
  'route.protocol': { stepName: 'route', inputName: 'protocols' },
  'route.path': { stepName: 'route', inputName: 'paths' },
  'route.host': { stepName: 'route', inputName: 'hosts' },
} satisfies Record<string, { stepName: StepNames; inputName: string }>;

type Keys = keyof typeof errorsMap;

type PublisherErrorResponse = {
  responseCode: string;
  message: string;
  detail: string;
  LocalDateTime: string;
  errors: Partial<Record<Keys, string>>;
};

function isPublisherError(err: AxiosError<unknown>): err is AxiosError<PublisherErrorResponse> {
  const errorData = err?.response?.data;
  return !!errorData && typeof errorData === 'object' && 'errors' in errorData && typeof errorData.errors === 'object';
}

const { SERVICES_LIST, SERVICE } = RQKEYS.BACKOFFICE;

export const usePostConfirmData = (setErrorMsg: (err: ErrorMsg | null) => void) => {
  const dispatch = useAppDispatch();
  const { serviceName } = useAppState();
  const queryClient = useQueryClient();
  const [t] = useTr();

  return useMutation({
    mutationFn: () => Api.postCofirmData(serviceName),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SERVICE], refetchType: 'none' });
      await queryClient.invalidateQueries({ queryKey: [SERVICES_LIST.DRAFTS], refetchType: 'none' });
    },
    onError: (e) => {
      if (isAxiosError(e) && isPublisherError(e)) {
        const errorsObj = e?.response?.data?.errors;
        if (errorsObj && Object.keys(errorsObj).length) {
          const stepErrors = Object.entries(errorsObj).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [errorsMap[key].stepName]: { ...acc[errorsMap[key].stepName], [errorsMap[key].inputName]: value },
            }),
            {} as ErrorPayload
          );
          return void addStepErrors(dispatch, stepErrors);
        }
      }
      const err = ApiUtil.getErrorMessage(e);
      setErrorMsg(getErrorMsg({ msg: err, t }));
    },
  });
};
