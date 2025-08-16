import { useState, useEffect } from "react";
import {
  TextInput,
  PasswordInput,
  Select,
  Button,
  Group,
  Stack,
  Alert,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconAlertCircle, IconEdit } from "@tabler/icons-react";

const roleOptions = [
  { value: "Communication", label: "Communication" },
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
  { value: "User", label: "User" },
];

export function EditUser({ user, opened, onClose, onUserUpdated }) {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      role: "",
    },

    validate: {
      email: (value) => {
        if (!value) return "Email is required";
        return /^\S+@\S+$/.test(value) ? null : "Invalid email format";
      },
      firstName: (value) => {
        if (!value) return "First name is required";
        return value.length < 2
          ? "First name must be at least 2 characters"
          : null;
      },
      lastName: (value) => {
        if (!value) return "Last name is required";
        return value.length < 2
          ? "Last name must be at least 2 characters"
          : null;
      },
      phoneNumber: (value) => {
        if (!value) return "Phone number is required";
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(value.replace(/\s/g, ""))
          ? null
          : "Invalid phone number format";
      },
      role: (value) => (!value ? "Role is required" : null),
    },
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      form.setValues({
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleSubmit = async (values) => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setNotification(null);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:4000/api/auth/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setNotification({
          type: "success",
          title: "Success!",
          message: "User updated successfully",
        });

        // Call the callback to refresh the table
        if (onUserUpdated) {
          onUserUpdated();
        }

        // Close modal after successful update
        setTimeout(() => {
          onClose();
          setNotification(null);
        }, 1500);
      } else {
        setNotification({
          type: "error",
          title: "Update Failed",
          message: data.message || "An error occurred during update",
        });
      }
    } catch (error) {
      setNotification({
        type: "error",
        title: "Network Error",
        message: "Unable to connect to the server. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose();
        setNotification(null);
      }}
      title={`Edit User: ${user?.firstName} ${user?.lastName}`}
      size="lg"
      centered
    >
      {notification && (
        <Alert
          icon={
            notification.type === "success" ? (
              <IconCheck size={16} />
            ) : (
              <IconAlertCircle size={16} />
            )
          }
          title={notification.title}
          color={notification.type === "success" ? "green" : "red"}
          mb="lg"
          withCloseButton
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <Group grow>
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              required
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Last Name"
              placeholder="Enter last name"
              required
              {...form.getInputProps("lastName")}
            />
          </Group>

          <TextInput
            label="Email Address"
            placeholder="user@example.com"
            required
            type="email"
            {...form.getInputProps("email")}
          />

          <TextInput
            label="Phone Number"
            placeholder="1234567890"
            required
            {...form.getInputProps("phoneNumber")}
          />

          <Select
            label="Role"
            placeholder="Select user role"
            required
            data={roleOptions}
            {...form.getInputProps("role")}
          />

          <Group justify="flex-end" mt="md">
            <Button
              type="button"
              variant="light"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              leftSection={loading ? null : <IconEdit size={16} />}
            >
              Update User
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
