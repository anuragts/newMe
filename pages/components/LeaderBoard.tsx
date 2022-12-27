import { useEffect } from "react";
import { useState } from "react";
import { Card, Text } from "@nextui-org/react";

export default function handler() {
  interface Leaderboard {
    id: number;
    name: string;
    resolutions: [number];
  }
  interface User {
    name: string;
    resolutions: [number];
  }

  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>();
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch("/api/user/leaderboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const sortedData = data.sort(
        (a: User, b: User) => b.resolutions.length - a.resolutions.length
      );

      if (data) {
        setLeaderboard(sortedData);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="float-right mt-[10rem] mr-[-8rem]">
      <Card css={{ width: "min-content" }}>
        <Card.Header  css={{ margin: "$5" }}>Leaderboard</Card.Header>
        {leaderboard && (
          <div className="w-min	  flex justify-center">
            <Card.Body css={{ py: "$10" }}>
              {leaderboard.map((user: Leaderboard) => (
                <div key={user.id} className="">
                  <Card.Divider />
                  <div className="flex flex-row mx-10 my-5">
                    <div>{user.name} </div>
                    <div className="mx-5"> - </div>
                    <div> {user.resolutions.length}</div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </div>
        )}
      </Card>
    </div>
  );
}
