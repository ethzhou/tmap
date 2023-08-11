import { useOutletContext, useParams } from "react-router";

export default function Lesson() {
  const { lessonID } = useParams();
  const obj = useOutletContext();

  return (
    <h1>
      Lesson {lessonID} {obj.foo}
    </h1>
  );
}