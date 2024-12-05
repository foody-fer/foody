import { Spinner } from "@chakra-ui/react";
import Link from "next/link";

const Pozdrav = () => {
  return <h1>Hello</h1>;
};

export default function Home() {
  const count = 1 + 2;

  return (
    <div>
      <Pozdrav />
      <Pozdrav />
      <Pozdrav />

      <Link href={"/sign-up"}>
        <button className="text-white bg-purple-800">Sign up</button>
      </Link>

      <Spinner />
    </div>
  );
}
