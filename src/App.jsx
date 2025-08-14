import { useState } from "react";
import "@mantine/core/styles.css";
import "./App.css";

import { MantineProvider } from "@mantine/core";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider>
      <h1>Vite + React + Mantine</h1>
    </MantineProvider>
  );
}

export default App;
