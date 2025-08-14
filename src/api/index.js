export const login = (email, password) => {
  return fetch(`${import.meta.env.VITE_APP_API_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        return data;
      }
      throw new Error(data.message);
    });
};
