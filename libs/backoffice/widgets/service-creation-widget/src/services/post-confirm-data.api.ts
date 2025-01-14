import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addStepErrors, ErrorPayload, StepNames, updateMessageAction, useAppDispatch, useAppState } from '../context';
import Api from './api';
import { ApiUtil, RQKEYS } from '@oxygen/utils';
import { AxiosError, isAxiosError } from 'axios';

const errorsMap = {
  'service.name': { stepName: 'generalInfo', inputName: 'englishName' },
  'service.throughput': { stepName: 'generalInfo', inputName: 'throughput' },
  'service.version': { stepName: 'generalInfo', inputName: 'version' },
  'service.owner': { stepName: 'generalInfo', inputName: 'owner' },
  'route.method': { stepName: 'route', inputName: 'actionOrMethod' },
  'route.protocol': { stepName: 'route', inputName: 'protocol' },
  'route.path': { stepName: 'route', inputName: 'path' },
  'route.host': { stepName: 'route', inputName: 'host' },
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

export const usePostConfirmData = () => {
  const dispatch = useAppDispatch();
  const { serviceName } = useAppState();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => Api.postCofirmData(serviceName),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [RQKEYS.BACKOFFICE.SERVICES_LIST.GET_LIST] });
      await queryClient.invalidateQueries({ queryKey: [RQKEYS.BACKOFFICE.SERVICES_LIST.DRAFTS], refetchType: 'none' });
    },
    onError: (e) => {
      if (isAxiosError(e) && isPublisherError(e)) {
        const errorsObj = e?.response?.data?.errors;
        if (errorsObj) {
          const stepErrors = Object.entries(errorsObj).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [errorsMap[key].stepName]: { ...acc[errorsMap[key].stepName], [errorsMap[key].inputName]: value },
            }),
            {} as ErrorPayload
          );
          addStepErrors(dispatch, stepErrors);
        }
      } else {
        const err = ApiUtil.getErrorMessage(e);
        updateMessageAction(dispatch, err);
      }
    },
  });
};
