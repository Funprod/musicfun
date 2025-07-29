import { useState } from 'react';
import { Pagination } from '../../../shared/ui/pagination/pagination';
import { DeletePlaylist } from '../../../features/playlists/delete-playlist/ui/delete-playlist';
import { usePlaylistsQuery } from '../api/use-playlists-query';

type Props = {
  userId?: string;
  onPlaylistSelected?: (playlistId: string) => void;
  onPlaylistDeleted?: (playlistId: string) => void;
  isSearchActive?: boolean;
};

export const Playlists = ({ userId, onPlaylistSelected, onPlaylistDeleted, isSearchActive }: Props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState('');

  const query = usePlaylistsQuery({ userId, options: { pageNumber, search } });

  const handleSelectPlaylistClick = (playlistId: string) => {
    onPlaylistSelected?.(playlistId);
  };

  const handleDeletePlaylistClick = (playlistId: string) => {
    onPlaylistDeleted?.(playlistId);
  };

  if (query.isPending) return <div>Loading...</div>;
  if (query.isError) return <div>{JSON.stringify(query.error.message)}</div>;

  return (
    <div>
      {isSearchActive && (
        <>
          <div>
            <input value={search} onChange={(e) => setSearch(e.currentTarget.value)} placeholder="Search..." />
          </div>
          <hr />
        </>
      )}
      <Pagination
        pagesCount={query.data.meta.pagesCount}
        currentPage={pageNumber}
        onPageNumberChange={setPageNumber}
        isFetching={query.isFetching}
      />
      <ul>
        {query.data.data.map((playlist) => (
          <li key={playlist.id}>
            <span onClick={() => handleSelectPlaylistClick(playlist.id)}> {playlist.attributes.title}</span>
            {userId && <DeletePlaylist id={playlist.id} onDeleted={handleDeletePlaylistClick} />}
          </li>
        ))}
      </ul>
    </div>
  );
};
