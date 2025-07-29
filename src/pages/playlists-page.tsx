import { Playlists } from '../widgets/playlists/ui/playlists';

export function PlaylistsPage() {
  return (
    <div>
      <h2>Main</h2>
      <Playlists isSearchActive={true} />
    </div>
  );
}
