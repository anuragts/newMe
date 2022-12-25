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

  const id = getId();
  const [resolutions, setResolutions] = useState<Resolution[]>([]);

  useEffect(() => {
    const fetchResolutions = async () => {
      const res = await fetch("/api/resolution/getall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
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

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/resolution/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data) {
      const newResolutions = resolutions.filter((r) => r.id !== id);
      setResolutions(newResolutions);
      window.location.reload();
    }
  };

  if (id == "" || id == "null") {
    router.push("/login");
  }

  return (
    <>
      {resolutions.map((resolution: any) => (
        <div key={resolution.id}>
          <Card variant="shadow" css={{ mw: "400px" }}>
            <Card.Body>
              <Text >{resolution.title}</Text>
              <Text>{resolution.description}</Text>
            </Card.Body>
            <Card.Divider />
            <Row justify="flex-end">
            <Button color={"success"} css={{ mx: "4px" , textDecoration:"bold" }}>
              Completed
            </Button>
              <Button color={"error"} css={{ mx: "4px" }} onPress={() => handleDelete(resolution.id)}>
                Delete
              </Button>
            </Row>
          </Card>
        </div>
      ))}
    </>
  );
};

export default ResolutionList;
