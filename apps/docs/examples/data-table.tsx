"use client";

import type { DataTableColumnProps } from "@/components/fabric-ui/data-table";
import { DataTable } from "@/components/fabric-ui/data-table";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns: DataTableColumnProps<User>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
  },
];

const data: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "User" },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "User",
  },
  { id: "4", name: "Diana Prince", email: "diana@example.com", role: "Editor" },
];

const Example = () => <DataTable columns={columns} data={data} />;

export default Example;
