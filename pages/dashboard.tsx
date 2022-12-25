import { useRouter } from "next/router";
import getId from "./components/getId";
import LogoutButton from "./components/LogoutButton";

export default function dashboard() {
  const router = useRouter();
  const id = getId();
  if (id == "" || id == "null") {
    router.push("/login");
  }

  return (
    <>
      <h1>dashboard</h1>
      <LogoutButton />
    </>
  );
}
