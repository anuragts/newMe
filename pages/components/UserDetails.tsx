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
  const [completedResolutions, setCompletedResolutions] = useState<string>();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });
      const {user , completedResolutions} = await res.json();
      if (completedResolutions){
        setCompletedResolutions(completedResolutions);
      }
      if (user) {
        console.log("success");
        setUser(user);
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
                </div>
              )}
              <div>
              {completedResolutions && <p>Resolutions completed: {completedResolutions}</p>}
              </div>
            </Text>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
}
