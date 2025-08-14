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
import { login } from "../api";
import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setError(err.message);
      });
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
          onChange={(event) => setEmail(event.currentTarget.value)}
          mt="md"
          error={error ? "Invalid email or password" : null}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit(event);
            }
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          radius="md"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit(event);
            }
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          radius="md"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit(event);
            }
          }}
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md" radius="md" onClick={handleSubmit}>
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor href="#" fw={500} onClick={(event) => event.preventDefault()}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
