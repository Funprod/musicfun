import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '../../../shared/api/client';
import { localStorageKeys } from '../../../shared/config/localstorage-keys';

export const callbackUrl = 'http://localhost:5173/oauth/callback';
export const useLogoutMutation = () => {
  const queryCLient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await client.POST('/auth/logout', {
        body: {
          refreshToken: localStorage.getItem(localStorageKeys.refreshToken)!,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      localStorage.removeItem(localStorageKeys.refreshToken);
      localStorage.removeItem(localStorageKeys.accessToken);
      queryCLient.resetQueries({
        queryKey: ['auth', 'me'],
      });
    },
  });

  return mutation;
};
