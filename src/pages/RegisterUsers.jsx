import { Text, Box, Group } from "@mantine/core";
// import { RegisterUser } from '../components/RegisterUser';
import { RegisterTable } from "../components/RegisterTable";
import { RegisterUser } from "./RegisterUser";

export function RegisterUsers() {
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
          <RegisterUser />
        </Group>
      </Box>
      <RegisterTable />
    </div>
  );
}
