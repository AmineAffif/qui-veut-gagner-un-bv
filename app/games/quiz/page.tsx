import React from "react";
import PrivateRoute from "components/privateRoute";
import "app/styles/quiz.css";
import Quiz from "components/quiz";

const QuizPage = () => {
  return (
    <PrivateRoute>
      <Quiz />
    </PrivateRoute>
  );
};

export default QuizPage;
