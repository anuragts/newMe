import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import { NextPage } from "next";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <div>
        <div className=" text-6xl mx-20 font-thin  mt-60">
          Transform your resolutions into reality with <br /> our easy-to-use
          platform .
        </div>
        <div className="text-primary">
          <Button
            css={{
              backgroundColor: "#AA96DA",
              color: "#FFFFD2",
              width: "200px",
              height: "50px",
              borderRadius: "300px",
              fontSize: "50px",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            Take off
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
