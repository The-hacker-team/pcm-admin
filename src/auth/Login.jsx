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
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:4000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem("token", data.token);
          navigate("/overview");
        }
        setError(data.message);
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
          onChange={(event) => setEmail(event.target.value)}
          mt="md"
          error={error ? "Invalid email or password" : null}
          // onKeyDown={(event) => {
          //   if (event.key === "Enter") {
          //     handleSubmit(event);
          //   }
          // }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          radius="md"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          // onKeyDown={(event) => {
          //   if (event.key === "Enter") {
          //     handleSubmit(event);
          //   }
          // }}
        />

        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button onClick={handleSubmit}>Login</Button>

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
