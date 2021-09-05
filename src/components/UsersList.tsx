import { User } from "../types";
import NoData from "./NoData";

interface PropsRow {
  onDetail?: (id: string) => void;
  onRemove?: (id: string) => void;
  user: User;
}

const Row = ({ onDetail, onRemove, user }: PropsRow) => (
  <tr>
    <td>
      <button
        className="button-link text-bold"
        disabled={!onDetail}
        onClick={() => onDetail && onDetail(user.id)}
      >{`${user.firstName} ${user.lastName}`}</button>
    </td>
    <td>{user.email}</td>
    <td className="table__remove">
      <button
        className="text-red"
        disabled={!onRemove}
        onClick={() => onRemove && onRemove(user.id)}
      >
        X
      </button>
    </td>
  </tr>
);

interface PropsUsersList {
  disabled: boolean;
  onDetail: (id: string) => void;
  onRemove: (id: string) => void;
  users: User[];
}

const UsersList = ({ disabled, onDetail, onRemove, users }: PropsUsersList) => {
  if (!users?.length) return <NoData />;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th colSpan={2}>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <Row
            key={user.id}
            onDetail={disabled ? undefined : onDetail}
            onRemove={disabled ? undefined : onRemove}
            user={user}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UsersList;
