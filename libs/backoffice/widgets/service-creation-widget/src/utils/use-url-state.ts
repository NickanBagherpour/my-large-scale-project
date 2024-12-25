import { notFound, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { type StepIndex, syncStateWithUrl, useAppDispatch } from '../context';
import { serviceNameSchema } from '../types';

function getStepFromUrl(queryParam: string | undefined): StepIndex {
  if (!queryParam || queryParam.trim() === '') {
    return 0;
  }
  const parsedStep = Number(queryParam.trim());
  if (Number.isNaN(parsedStep)) {
    return 0;
  }
  if (parsedStep >= 0 && parsedStep <= 4) {
    return parsedStep as StepIndex;
  }
  return 0;
}

function getServiceNameFromUrl(maybeServiceName: string | undefined): string | false {
  const serviceName = serviceNameSchema(((t: unknown) => t) as any).safeParse(maybeServiceName);
  if (serviceName.success) return serviceName.data;
  else return false;
}

export function useUrlState() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const maybeStep = searchParams.get('step')?.toString();
  const maybeServiceName = searchParams.get('service-name')?.toString();
  const serviceName = getServiceNameFromUrl(maybeServiceName);
  const step = getStepFromUrl(maybeStep);

  useEffect(
    () => {
      // If 'service-name' is not found in the query parameters, trigger a 404 not found response
      if (!serviceName) notFound();
      else {
        // If 'service-name' is valid, update the URL to remove query parameters,
        // preventing url from going out of sync with the component's state.
        // replace(pathname); this breaks the app if the user refershed the page, maybe only clear the step from url
        syncStateWithUrl(dispatch, { serviceName, step });
      }
    },
    [
      /* pathname, replace, serviceName, dispatch, step */
    ]
  ); // Run this effect only on the initial render

  return step;
}
