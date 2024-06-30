"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminUserType } from "@/types/AdminUserType";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewAdminUserPage = () => {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUserType>({
    id: null,
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    created_at: "",
    updated_at: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setAdminUser((prevAdminUser) => ({
      ...prevAdminUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    const new_admin_user_data = {
      admin_user: {
        email: adminUser.email,
        password: adminUser.password,
        first_name: adminUser.first_name,
        last_name: adminUser.last_name,
      },
    };

    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin_users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(new_admin_user_data),
      }
    );

    if (response.ok) {
      router.push("/amine/admin_users");
    } else {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">Create New Admin Users</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mt-2">Email</label>
          <Input
            type="text"
            name="email"
            value={adminUser.email}
            onChange={handleChange}
            className="w-full mt-2 p-2 border"
          />
          <label className="block text-gray-700 mt-2">Password</label>
          <Input
            type="password"
            name="password"
            value={adminUser.password}
            onChange={handleChange}
            className="w-full mt-2 p-2 border"
          />
          <label className="block text-gray-700 mt-2">Firstname</label>
          <Input
            type="text"
            name="first_name"
            value={adminUser.first_name}
            onChange={handleChange}
            className="w-full mt-2 p-2 border"
          />
          <label className="block text-gray-700 mt-2">Lastname</label>
          <Input
            type="text"
            name="last_name"
            value={adminUser.last_name}
            onChange={handleChange}
            className="w-full mt-2 p-2 border"
          />
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

export default NewAdminUserPage;
