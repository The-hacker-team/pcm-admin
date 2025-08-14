import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./auth.module.css";
import { postRequest } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data, error } = await postRequest({
        email,
        password,
      });

      if (error) {
        setError(error);
        return;
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
        navigate("/overview");
      } else {
        setError(data?.message || "Login failed");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Welcome back to pcm admin!
        </Title>

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          radius="md"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          mt="md"
          error={error ? "Invalid email or password" : null}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          radius="md"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button
          fullWidth
          mt="xl"
          size="md"
          radius="md"
          onClick={handleSubmit}
          loading={loading}
        >
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor href="#" fw={500} onClick={handleSubmit}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
