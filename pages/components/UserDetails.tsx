import getId from "./getId";
import { useState } from "react";
import { useEffect } from "react";

export default function UserDetails() {
  interface User {
    name: string;
    email: string;
    completed: string;
  }

  const userId = getId();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });
      const data = await res.json();
      if (data) {
        console.log("success");
        setUser(data);
      } else {
        console.log("failed");
      }
    };
    fetchUser()
  }, []);

  return (
    <div>
      {user && (
        <div>
          <h1>User Details</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Completed: {user.completed}</p>
        </div>
      )}
    </div>
  );
}
