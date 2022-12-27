import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userId", "");
      router.push("/login");
    }
  };

  return (
    <Button onClick={handleLogout} bordered color="error" css={{margin:"$5"}} size={"lg"} auto>
      Logout
    </Button>
  );
}

export default LogoutButton;
