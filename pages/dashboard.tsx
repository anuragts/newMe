import { useRouter } from "next/router";
import getId from "./getId";


export default function dashboard() {
  const router = useRouter();
  const id = getId();
  if (id=="" || id=="null") {
    router.push("/login");
  }
  

  return <div>dashboard as </div>;

}