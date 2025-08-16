import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import cx from "clsx";
import {
  Avatar,
  Checkbox,
  Group,
  ScrollArea,
  Table,
  Text,
  Loader,
  Alert,
  Center,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { IconAlertCircle, IconEdit, IconTrash } from "@tabler/icons-react";
import classes from "./Styles.module.css";
import { EditUser } from "./EditUser";

export const RegisterTable = forwardRef((props, ref) => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editModalOpened, setEditModalOpened] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/auth/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("users", data);
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit user
  const handleEdit = (user) => {
    console.log("Edit user:", user);
    setEditUser(user);
    setEditModalOpened(true);
  };

  // Handle user updated
  const handleUserUpdated = () => {
    fetchUsers(); // Refresh the users list
  };

  // Handle delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/auth/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Remove user from local state
        setUsers(users.filter((user) => user.id !== userId));
        // Remove from selection if selected
        setSelection((current) => current.filter((id) => id !== userId));
        console.log("User deleted successfully");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Expose fetchUsers method to parent component
  useImperativeHandle(ref, () => ({
    fetchUsers,
  }));

  const [selection, setSelection] = useState([]);
  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === users.length ? [] : users.map((item) => item.id)
    );

  const rows = users.map((item) => {
    const selected = selection.includes(item.id);
    // Generate avatar initials
    const initials = `${item?.firstName?.charAt(0) || ""}${
      item?.lastName?.charAt(0) || ""
    }`.toUpperCase();

    return (
      <Table.Tr
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={32} radius="xl" color="blue">
              {initials}
            </Avatar>
            <div>
              <Text size="sm" fw={500}>
                {item?.firstName} {item?.lastName}
              </Text>
              <Text size="xs" c="dimmed">
                ID: {item?.id}
              </Text>
            </div>
          </Group>
        </Table.Td>
        <Table.Td>
          <Text size="sm">{item.email}</Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm">{item?.phoneNumber || "N/A"}</Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm" fw={500} c="blue">
            {item?.role}
          </Text>
        </Table.Td>
        <Table.Td>
          <Group gap="xs">
            <Tooltip label="Edit user">
              <ActionIcon
                variant="subtle"
                color="blue"
                size="sm"
                onClick={() => handleEdit(item)}
              >
                <IconEdit size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete user">
              <ActionIcon
                variant="subtle"
                color="red"
                size="sm"
                onClick={() => handleDelete(item.id)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  // Show loading state
  if (loading) {
    return (
      <Center p="xl">
        <Loader size="md" />
      </Center>
    );
  }

  // Show error state
  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="Error"
        color="red"
        mb="md"
      >
        {error}
      </Alert>
    );
  }

  // Show empty state
  if (users.length === 0) {
    return (
      <Center p="xl">
        <Text c="dimmed">No users found</Text>
      </Center>
    );
  }

  return (
    <>
      <ScrollArea>
        <Table miw={800} verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={40}>
                <Checkbox
                  onChange={toggleAll}
                  checked={
                    selection.length === users.length && users.length > 0
                  }
                  indeterminate={
                    selection.length > 0 && selection.length !== users.length
                  }
                />
              </Table.Th>
              <Table.Th>User</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      {/* Edit User Modal */}
      <EditUser
        user={editUser}
        opened={editModalOpened}
        onClose={() => {
          setEditModalOpened(false);
          setEditUser(null);
        }}
        onUserUpdated={handleUserUpdated}
      />
    </>
  );
});
