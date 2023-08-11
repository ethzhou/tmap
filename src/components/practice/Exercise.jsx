import { useOutletContext, useParams } from "react-router";

export default function Exercise() {
  const { exerciseID } = useParams();
  const obj = useOutletContext();
  
  return (
    <h1>
      Excercise {exerciseID} {obj.foo}
    </h1>
  )
}