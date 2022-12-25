import { useState } from "react";
import getId from "./getId";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();

  const [data, setData] = useState([]);
  const id = getId();
  if (id) {
    router.push("/dashboard");
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data);

    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: dataObj.email,
        password: dataObj.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result);
    const y = result.id;
    const parsedUserId = y?.toString() || null;
    localStorage.setItem("userId", parsedUserId);
    setData(parsedUserId)
    console.log(result);
    if (response.status === 200) {
      console.log("success");
      router.push("/dashboard");
    } else {
      console.log("failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Login</button>
      </form>
      <p>{data}</p>
    </div>
  );
}