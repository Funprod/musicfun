import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { playlistsKeys } from '../../../shared/api/keys-factories/playlists-keys-factories';
import { client } from '../../../shared/api/client';

type Props = {
  userId?: string;
  options: Options;
};

type Options = {
  pageNumber: number;
  search: string;
};

export const usePlaylistsQuery = ({ userId, options }: Props) => {
  const key = userId ? playlistsKeys.myList() : playlistsKeys.list(options);
  const queryParams = userId ? { userId } : options;

  const query = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: key,
    queryFn: async ({ signal }) => {
      const res = await client.GET('/playlists', {
        params: {
          query: queryParams,
        },
        signal,
      });
      if (res.error) {
        throw (res as unknown as { error: { error: string } }).error;
      }
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
  return query;
};
