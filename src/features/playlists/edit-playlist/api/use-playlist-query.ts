import { useQuery } from '@tanstack/react-query';
import { client } from '../../../../shared/api/client';
import { playlistsKeys } from '../../../../shared/api/keys-factories/playlists-keys-factories';

export const usePlaylistQuery = (playlistId: string | null) => {
  return useQuery({
    queryKey: playlistsKeys.detail(playlistId!),
    queryFn: async () => {
      const res = await client.GET('/playlists/{playlistId}', {
        params: {
          path: {
            playlistId: playlistId!,
          },
        },
      });
      return res.data!;
    },
    enabled: !!playlistId,
  });
};
