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
      <Pozdrav />
    </div>
  );
}
