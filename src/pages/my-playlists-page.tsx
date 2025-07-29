import { Navigate } from '@tanstack/react-router';
import { useMeQuery } from '../features/auth/api/use-me-query';
import { Playlists } from '../widgets/playlists/ui/playlists';
import { AddPlaylistForm } from '../features/playlists/add-playlist/ui/add-playlist-from';
import { EditPlaylistForm } from '../features/playlists/edit-playlist/ui/edit-playlist-from';
import { useState } from 'react';

export function MyPlaylistsPage() {
  const { data, isPending } = useMeQuery();
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null);

  const handlePlaylistDelete = (playlistId: string) => {
    if (playlistId === editingPlaylistId) setEditingPlaylistId(null);
  };

  if (isPending) return <div>Loading...</div>;
  if (!data) return <Navigate to="/" replace />;

  return (
    <div>
      <h2>My Playlist</h2>
      <hr />
      <AddPlaylistForm />
      <hr />
      <Playlists
        userId={data.userId}
        onPlaylistSelected={setEditingPlaylistId}
        onPlaylistDeleted={handlePlaylistDelete}
      />
      <hr />
      <EditPlaylistForm playlistId={editingPlaylistId} onCancelEditing={() => setEditingPlaylistId(null)} />
    </div>
  );
}
