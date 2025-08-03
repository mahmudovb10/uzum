import { useGlobalContext } from "../hooks/useGlobalContext";
function About() {
  const data = useGlobalContext();
  console.log(data);
  return (
    <>
      <h1 className="text-3xl">About</h1>
    </>
  );
}
export default About;
