import { useState, useRef } from "react";
import { Text, Box, Group } from "@mantine/core";
// import { RegisterUser } from '../components/RegisterUser';
import { RegisterTable } from "../components/RegisterTable";
import { RegisterUser } from "./RegisterUser";

export function RegisterUsers() {
  const tableRef = useRef();

  const handleUserCreated = () => {
    // Refresh the table when a user is created
    if (tableRef.current) {
      tableRef.current.fetchUsers();
    }
  };

  return (
    <div>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Group>
          <Text size="lg" fw={500} mb="md">
            User Management
            <Text c="dimmed" mb="lg">
              Register new users to the platform and manage their access levels.
            </Text>
          </Text>
        </Group>
        <Group mb="lg">
          <RegisterUser onUserCreated={handleUserCreated} />
        </Group>
      </Box>
      <RegisterTable ref={tableRef} />
    </div>
  );
}
