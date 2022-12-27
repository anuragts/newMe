import { useEffect } from "react";
import { useState } from "react";

export default function handler() {
  interface Leaderboard {
    id: number;
    name: string;
    resolutions : [number]
  }
  interface User {
    name: string;
    resolutions : [number]

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
    <div>
      <h1>Leaderboard</h1>
      {leaderboard && (
        <div>
          {leaderboard.map((user: Leaderboard) => (
            <div key={user.id}>
              <p>{user.resolutions.length}</p>
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
