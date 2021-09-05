import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../api";
import { User } from "../types";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import Page from "../components/Page";
import UsersList from "../components/UsersList";
import CreateUser from "../forms/CreateUser";
import EditUser from "../forms/EditUser";
import { useUsers } from "../hooks/useUsers";

const Users = () => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const { data: usersData, error, loading } = useUsers();
  const [userRemoveLoading, setUserRemoveLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(usersData);
  }, [usersData]);

  const handleModalClose = () => {
    setSelectedUser(undefined);
  };

  const handleUserDetail = (id: string) => {
    const selectedUser = users.find((user: User) => user.id === id);
    setSelectedUser(selectedUser);
  };

  const handleRemove = (id: string) => {
    setUserRemoveLoading(true);
    api
      .deleteUser(id)
      .then(() => {
        toast.success("User was removed");
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setUserRemoveLoading(false);
      });
  };

  const handleUserEdited = (editedUser: User) => {
    const newUsers: User[] = users.map((user) => {
      if (user.id === editedUser.id) return editedUser;
      return user;
    });
    setUsers(newUsers);
  };

  const handleUserCreated = (user: User) => {
    setUsers([...users, user]);
  };

  return (
    <Page>
      <h1>List of users</h1>
      <CreateUser onCreated={handleUserCreated} />
      {error && <Error message={error} />}
      <div className="m30"></div>
      {loading ? (
        <Loading />
      ) : (
        <UsersList
          disabled={userRemoveLoading}
          onDetail={handleUserDetail}
          onRemove={handleRemove}
          users={users}
        />
      )}
      {selectedUser && (
        <Modal
          onClose={handleModalClose}
          title={`${selectedUser.firstName} ${selectedUser.lastName}`}
        >
          <EditUser
            onCancel={handleModalClose}
            onClose={handleModalClose}
            onEdited={handleUserEdited}
            user={selectedUser}
          />
        </Modal>
      )}
    </Page>
  );
};

export default Users;
