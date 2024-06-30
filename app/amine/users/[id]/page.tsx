"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { UserType } from "@/types/UserType";
import Lottie from "lottie-react";
import loadingC from "public/loading_c.json";
import { Edit, Loader2, Save, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UserDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        const data: UserType = await response.json();
        setUser(data);
      };

      fetchUser();
    }
  }, [id]);

  const handleEdit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (user) {
      setIsSaving(true);
      const updated_user_data = {
        user: {
          email: user.email,
        },
      };
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(updated_user_data),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        setIsSaving(false);
      }
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      setIsDeleting(true);
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        router.push("/amine/users");
      } else {
        setIsDeleting(false);
      }
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          [name]: value,
        } as UserType;
      }
      return prevUser;
    });
  };

  if (!user)
    return (
      <div className="p-6 pt-20 flex flex-col justify-center items-center h-screen">
        <div className="w-20 h-20">
          <Lottie animationData={loadingC} loop={true} />
        </div>
      </div>
    );

  return (
    <div className="p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">User Details</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">ID</label>
          <Input
            type="number"
            name="id"
            value={user.id as number}
            disabled
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <Input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Created At</label>
          <Input
            type="text"
            name="created_at"
            value={user.created_at}
            disabled
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Updated At</label>
          <Input
            type="text"
            name="updated_at"
            value={user.updated_at}
            disabled
            className="w-full p-2 border"
          />
        </div>
        <div className="flex space-x-4">
          {!isEditing ? (
            <Button
              type="button"
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white"
            >
              <Edit className="mr-2 h-4 w-4" /> Modifier
            </Button>
          ) : isSaving ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <Save className="mr-2 h-4 w-4" /> Sauvegarder
            </Button>
          )}
          <Button
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Suppression...
              </>
            ) : (
              <>
                <Trash className="mr-2 h-4 w-4" /> Supprimer
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserDetailPage;
