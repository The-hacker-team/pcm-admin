import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Select,
  Button,
  Title,
  Group,
  Stack,
  Alert,
  Modal,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconCheck,
  IconAlertCircle,
  IconUserPlus,
} from "@tabler/icons-react";

const roleOptions = [
  { value: "communication", label: "Communication" },
  { value: "admin", label: "Admin" },
  { value: "secretary", label: "secretary" },
  { value: "treasurer", label: "Treasurer" },
];

export function RegisterUser() {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
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
      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return null;
      },
      role: (value) => (!value ? "Role is required" : null),
    },
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setNotification(null);

      // Get the auth token from localStorage
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({
          type: "success",
          title: "Success!",
          message: "User registered successfully",
        });
        form.reset();
        // Close modal after successful registration
        setTimeout(() => {
          setModalOpened(false);
          setNotification(null);
        }, 2000);
      } else {
        setNotification({
          type: "error",
          title: "Registration Failed",
          message: data.message || "An error occurred during registration",
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
    <Box>
      {/* Button to open modal */}
      <Button
        leftSection={<IconUserPlus size={16} />}
        onClick={() => setModalOpened(true)}
        size="md"
      >
        Register New User
      </Button>

      {/* Modal with registration form */}
      <Modal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setNotification(null);
          form.reset();
        }}
        title={<Title order={3}>Register New User</Title>}
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
                size="lg"
                radius="md"
              />
              <TextInput
                label="Last Name"
                placeholder="Enter last name"
                required
                {...form.getInputProps("lastName")}
                size="lg"
                radius="md"
              />
            </Group>

            <TextInput
              label="Email Address"
              placeholder="user@example.com"
              required
              type="email"
              {...form.getInputProps("email")}
              size="lg"
              radius="md"
            />

            <TextInput
              label="Phone Number"
              placeholder="1234567890"
              required
              {...form.getInputProps("phoneNumber")}
              size="lg"
              radius="md"
            />

            <Select
              label="Role"
              placeholder="Select user role"
              required
              data={roleOptions}
              {...form.getInputProps("role")}
              size="lg"
              radius="md"
            />

            <PasswordInput
              label="Password"
              placeholder="Enter password"
              required
              {...form.getInputProps("password")}
              size="lg"
              radius="md"
            />

            <Group justify="flex-end" mt="md">
              <Button
                type="button"
                variant="light"
                onClick={() => {
                  setModalOpened(false);
                  setNotification(null);
                  form.reset();
                }}
                disabled={loading}
                radius="md"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
                leftSection={loading ? null : <IconCheck size={16} />}
                radius="md"
              >
                Register User
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}
