import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";

/**
 * 
 * @param {Function} generateParameters Returns an object holding the parameters of the exercise.
 * @param {string} submissionEventType Type of event triggering the record update process.
 * @param {Function} generateRecordUpdate Takes an event and the exercise parameters and returns an object holding a score and history entry.
 * @returns An object holding the exercise data.
 */
export default function useExercise(generateParameters, submissionEventType, generateRecordUpdate) {
  const [record, setRecord] = useState({ score: 0, history: [] });
  
  const { totalSeconds } = useStopwatch({
    autoStart: true,
  });

  const [parameters, setParameters] = useState();

  const [submissionCallback, setSubmissionCallback] = useState();


  // Create a new exercise
  useEffect(() => {
    setParameters(generateParameters);
  }, [record]);

  // Update the record and record updater
  useEffect(() => {
    document.removeEventListener(submissionEventType, submissionCallback);
    setSubmissionCallback(() => (event) => {
      const update = generateRecordUpdate(event, parameters);
      update && setRecord(record => {
        return {
          score: record.score + update.score,
          history: [...record.history, update],
        };
      });
    });
  }, [parameters]);

  // Manage event listeners
  useEffect(() => {
    document.addEventListener(submissionEventType, submissionCallback);

    return () =>
      document.removeEventListener(submissionEventType, submissionCallback);
  }, [submissionCallback]);

  return { parameters, totalSeconds, record };
}