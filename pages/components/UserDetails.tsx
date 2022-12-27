import getId from "./getId";
import { useState } from "react";
import { useEffect } from "react";
import { Popover, Button, Text } from "@nextui-org/react";

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
    fetchUser();
  }, []);

  return (
    <div>
      <div className="float-right mx-[2rem] mt-[-2rem]">
        <Popover isBordered >
          <Popover.Trigger>
            <Button auto flat>
              Details
            </Button>
          </Popover.Trigger>
          <Popover.Content css={{marginRight:"$10"}}>
            <Text css={{ p: "$10"  }}>
              {" "}
              {user && (
                <div>
                  <p>Username: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Resolutions completed: {user.completed}</p>
                </div>
              )}
            </Text>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
}
