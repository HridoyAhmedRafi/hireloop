import { UsersView } from "@/components/admin-dashboard/users-view";
import { getUsers } from "@/lib/api/admin-users";

const AdminUserPage = async () => {
  const { users } = await getUsers();

  return <UsersView users={users} />;
};

export default AdminUserPage;
