import { Text } from "@mantine/core";

export function Announcements() {
  return (
    <div>
      <Text size="lg" fw={500} mb="md">
        Announcements
      </Text>
      <Text c="dimmed" mb="lg">
        Create and manage announcements for your community.
      </Text>
      {/* Add your announcements content here */}
    </div>
  );
}
