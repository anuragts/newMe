import { useRouter } from "next/router";
import getId from "./components/getId";
import Createresolution from "./components/Createresolution";
import LogoutButton from "./components/LogoutButton";
import ResolutionList from "./components/ResolutionList";
import UserDetails from "./components/UserDetails";


export default function dashboard() {
  const router = useRouter();
  const id = getId();
  if (id == "" || id == "null") {   
    router.push("/login");
  }

  return (
    <>
      <LogoutButton />
      <UserDetails />
      <h1 className="text-center text-3xl my-[5rem]">My Resolutions</h1>
      <Createresolution />
      <ResolutionList />
    </>
  );
}
