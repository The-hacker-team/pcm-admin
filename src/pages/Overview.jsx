import { Text } from "@mantine/core";

export function Overview() {
  return (
    <div>
      <Text size="lg" fw={500} mb="md">
        Dashboard Overview
      </Text>
      <Text c="dimmed" mb="lg">
        Here you can view key metrics and recent activities across your
        platform.
      </Text>
      {/* Add your overview content here */}
    </div>
  );
}
