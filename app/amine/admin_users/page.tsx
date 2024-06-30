"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { AdminUserType } from "@/types/AdminUserType";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatTimestamp } from "@/utils/TimeFormatter";
import AmineLayout from "../amineLayout";

const AdminUsersPage = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUserType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchAdminUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin_users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setAdminUsers(data);
    };

    fetchAdminUser();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    // <div className="p-6 pt-24">
    <AmineLayout>
      <div className="mb-4 flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Admin Users</h1>
        <Link href="/amine/questions/new" className="h-0">
          <Button className="bg-green-600 hover:bg-green-700">
            <PlusIcon className="mr-2 h-4 w-4" /> New
          </Button>
        </Link>
      </div>
      <div className="relative w-full mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="relative w-full overflow-auto bg-white border rounded-md">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminUsers.map((admin_user) => (
              <TableRow
                key={admin_user.id}
                onClick={() =>
                  (window.location.href = `/amine/admin_users/${admin_user.id}`)
                }
              >
                <TableCell>{admin_user.id}</TableCell>
                <TableCell>{admin_user.email}</TableCell>
                <TableCell>{formatTimestamp(admin_user.created_at)}</TableCell>
                <TableCell>{formatTimestamp(admin_user.updated_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AmineLayout>
    // </div>
  );
};

export default AdminUsersPage;
