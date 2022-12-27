import { useRouter } from "next/router";
import getId from "./components/getId";
import Createresolution from "./components/Createresolution";
import LogoutButton from "./components/LogoutButton";
import NotResolutionList from "./components/NotResolutionList";
import YesResolutionList from "./components/YesResolutionList";
import UserDetails from "./components/UserDetails";
import LeaderBoard from "./components/LeaderBoard";


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
      <LeaderBoard />
      <h1 className="text-center text-3xl my-[5rem]">My Resolutions</h1>
      <Createresolution />
      <NotResolutionList />
      <YesResolutionList />
    </>
  );
}
