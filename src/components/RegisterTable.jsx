import { useEffect, useState } from "react";
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
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import classes from "./Styles.module.css";

export function RegisterTable() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:4000/api/auth/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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

  useEffect(() => {
    fetchUsers();
  }, []);

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
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={40}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === users.length && users.length > 0}
                indeterminate={
                  selection.length > 0 && selection.length !== users.length
                }
              />
            </Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Role</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
