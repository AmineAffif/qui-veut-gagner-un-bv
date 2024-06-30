"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionType } from "@/types/QuestionType";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewQuestionPage = () => {
  const router = useRouter();
  const [question, setQuestion] = useState<QuestionType>({
    id: null,
    text: "",
    right_answer_id: null,
    created_at: "",
    updated_at: "",
    answers: [
      { id: 1, text: "", question_id: null },
      { id: 2, text: "", question_id: null },
    ],
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const handleAnswerChange = (index: number, value: string) => {
    setQuestion((prevQuestion) => {
      const newAnswers = [...prevQuestion.answers];
      newAnswers[index] = { ...newAnswers[index], text: value };
      return { ...prevQuestion, answers: newAnswers };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);

    const new_question_data = {
      question: {
        text: question.text,
        right_answer_id: question.answers.findIndex(
          (answer) => answer.id === question.right_answer_id
        ),
        answers_attributes: question.answers.map((answer) => ({
          text: answer.text,
        })),
      },
    };

    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(new_question_data),
      }
    );

    if (response.ok) {
      router.push("/amine/questions");
    } else {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">Create New Question</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Text</label>
          <input
            type="text"
            name="text"
            value={question.text}
            onChange={handleChange}
            className="w-full mt-2 p-2 border"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Answers</h2>
          {question.answers.map((answer, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={answer.text}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full mt-2 p-2 border"
              />
              <input
                type="checkbox"
                checked={question.right_answer_id === answer.id}
                onChange={() => {
                  setQuestion((prevQuestion) => ({
                    ...prevQuestion,
                    right_answer_id: answer.id,
                  }));
                }}
                className="ml-4"
              />
            </div>
          ))}
        </div>
        {isSaving ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enregistrement...
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        )}
      </form>
    </div>
  );
};

export default NewQuestionPage;
