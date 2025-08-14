// api.js
export const postRequest = async (payload) => {
  try {
    const res = await fetch("http://localhost:4000/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    console.error("API request failed:", error);
    return { data: null, error: error.message || "Something went wrong" };
  }
};
