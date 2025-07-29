import { MutationCache, QueryClient } from '@tanstack/react-query';
import { mutationGlobalErrorHandler } from '../../shared/ui/util/query-error-handler-for-rhf-factory';

export type MutationMeta = { globalErrorHandler: 'on' | 'off' };

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: MutationMeta;
  }
}

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: mutationGlobalErrorHandler,
  }),
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
