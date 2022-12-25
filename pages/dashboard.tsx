import { useRouter } from "next/router";
import getId from "./components/getId";
import LogoutButton from "./components/LogoutButton";
import Createresolution from "./components/Createresolution";
import ResolutionList from "./components/ResolutionList";


export default function dashboard() {
  const router = useRouter();
  const id = getId();
  if (id == "" || id == "null") {   
    router.push("/login");
  }

  return (
    <>
      <h1 className="text-center text-3xl my-[5rem]">My Resolutions</h1>
      <LogoutButton />
      <Createresolution />
      <ResolutionList />
    </>
  );
}
