import { useQuery } from '@tanstack/react-query';
import { client } from '../../../shared/api/client';
import { authKeys } from '../../../shared/api/keys-factories/auth-keys-factories';

export const useMeQuery = () =>
  useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const res = await client.GET('/auth/me');
      return res.data;
    },
    retry: false,
  });
