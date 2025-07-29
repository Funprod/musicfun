import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '../../../../shared/api/client';
import type { SchemaGetPlaylistsOutput } from '../../../../shared/api/schema';
import { playlistsKeys } from '../../../../shared/api/keys-factories/playlists-keys-factories';

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (playlistId: string) => {
      const res = await client.DELETE('/playlists/{playlistId}', {
        params: {
          path: {
            playlistId,
          },
        },
      });
      return res.data;
    },
    onSuccess: (_, playlistId) => {
      queryClient.setQueriesData({ queryKey: playlistsKeys.lists() }, (oldData: SchemaGetPlaylistsOutput) => {
        return {
          ...oldData,
          data: oldData.data.filter((p) => p.id !== playlistId),
        };
      });
      queryClient.removeQueries({ queryKey: playlistsKeys.detail(playlistId) });
    },
  });

  return mutation;
};
