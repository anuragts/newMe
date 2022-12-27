import { useState, useEffect } from "react";
import { Button, Card, Text, Row } from "@nextui-org/react";
import { useRouter } from "next/router";
import getId from "./getId";

const ResolutionList = () => {
  interface Resolution {
    id: number;
    title: string;
    description: string;
    userId: number;
  }
  const router = useRouter();

  const userId = getId();
  const [resolutions, setResolutions] = useState<Resolution[]>([]);

  useEffect(() => {
    const fetchResolutions = async () => {
      const res = await fetch("/api/resolution/getyes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });
      const data = await res.json();
      if (data) {
        console.log("success");
        setResolutions(data);
      } else {
        console.log("failed");
      }
    };
    fetchResolutions();
  }, []);


  

  if (userId == "" || userId == "null") {
    router.push("/login");
  }

  return (
    <>
        <h1 className="text-2xl text-center my-10">Completed Resolutions</h1>
      <div className="flex justify-center  flex-wrap flex-row">
        {resolutions.map((resolution: any) => (
          <div key={resolution.id} className=" my-5 mx-5">
            <Card variant="shadow" css={{ mw: "400px" }}>
              <Card.Body>
                <Text size={"$2xl"} css={{textAlign:"center",marginLeft:"$10",paddingLeft:"$10",paddingRight:"$10", marginRight:"$10", textDecorationLine:"line-through" ,textDecorationColor:"$gray900",textDecorationStyle:"solid" }}>{resolution.title}</Text>
                <Text css={{textAlign:"center",textDecorationLine:"line-through",textDecorationColor:"$gray900"}}>{resolution.description}</Text>
              </Card.Body>
              <Card.Divider />
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default ResolutionList;
