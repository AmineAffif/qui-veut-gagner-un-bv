"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { QuestionType } from "@/types/QuestionType";

const QuestionDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log("id ====== : ", id);

    if (id) {
      const fetchQuestion = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        const data: QuestionType = await response.json();
        setQuestion(data);
      };

      fetchQuestion();
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // Save logic here
    if (question) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`,
        {
          method: "PUT", // Use PUT method for update
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(question),
        },
      );

      if (response.ok) {
        setIsEditing(false);
      }
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setQuestion((prevQuestion) => {
      if (prevQuestion) {
        return {
          ...prevQuestion,
          [name]: value,
        } as QuestionType;
      }
      return prevQuestion;
    });
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Question Details</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">ID</label>
          <input
            type="text"
            name="id"
            value={question.id}
            disabled
            className="w-full mt-2 p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Text</label>
          <input
            type="text"
            name="text"
            value={question.text}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full mt-2 p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Right Answer ID</label>
          <input
            type="text"
            name="right_answer_id"
            value={question.right_answer_id}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full mt-2 p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Created At</label>
          <input
            type="text"
            name="created_at"
            value={question.created_at}
            disabled
            className="w-full mt-2 p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Updated At</label>
          <input
            type="text"
            name="updated_at"
            value={question.updated_at}
            disabled
            className="w-full mt-2 p-2 border"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Answers</h2>
          {question.answers.map((answer, index) => (
            <div key={answer.id} className="flex items-center mb-2">
              <input
                type="text"
                name={`answers[${index}].text`}
                value={answer.text}
                onChange={(e) => {
                  const { value } = e.target;
                  setQuestion((prevQuestion) => {
                    if (prevQuestion) {
                      const newAnswers = [...prevQuestion.answers];
                      newAnswers[index] = { ...newAnswers[index], text: value };
                      return { ...prevQuestion, answers: newAnswers };
                    }
                    return prevQuestion;
                  });
                }}
                disabled={!isEditing}
                className="w-full mt-2 p-2 border"
              />
              <input
                type="checkbox"
                name="right_answer_id"
                checked={question.right_answer_id === answer.id}
                onChange={() => {
                  setQuestion((prevQuestion) => {
                    if (prevQuestion) {
                      return {
                        ...prevQuestion,
                        right_answer_id: answer.id,
                      };
                    }
                    return prevQuestion;
                  });
                }}
                disabled={!isEditing}
                className="ml-4"
              />
            </div>
          ))}
        </div>
        {!isEditing ? (
          <button
            type="button"
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white"
          >
            Modifier
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white"
          >
            Sauvegarder
          </button>
        )}
      </form>
    </div>
  );
};

export default QuestionDetailPage;
