import { useDeleteMutation } from '../api/use-delete-mutation';

type Props = {
  id: string;
  onDeleted?: (id: string) => void;
};

export const DeletePlaylist = ({ id, onDeleted }: Props) => {
  const { mutate } = useDeleteMutation();
  const handleDeleteClick = () => {
    mutate(id);
    onDeleted?.(id);
  };
  return <button onClick={handleDeleteClick}>Delete playlist</button>;
};
