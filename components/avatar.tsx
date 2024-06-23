"use client";

import { useState, ChangeEvent } from "react";
import { useToast } from "@/components/ui/use-toast";

interface UploadAvatarProps {
  userId: number;
  initialAvatarUrl?: string;
}

const UploadAvatar = ({ userId, initialAvatarUrl }: UploadAvatarProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    initialAvatarUrl || null
  );
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "No token found. Please log in again.",
        style: { backgroundColor: "red", color: "white" },
      });
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/update_avatar`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      setAvatarUrl(data.url);
      toast({
        description: "Image uploaded successfully.",
        style: { backgroundColor: "green", color: "white" },
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to upload image.",
        style: { backgroundColor: "red", color: "white" },
      });
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400">Upload</div>
        )}
      </div>
    </div>
  );
};

export default UploadAvatar;
