"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ElementsType, ElementInstance } from "../builder/elements";
import { ReactNode } from "react";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateEntry } from "@/server/entries";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface SubmissionsTableProps {
  formElements: ElementInstance[];
  submissions: any;
}

type Row = {
  [key: string]: string;
};

export function SubmissionsTable({
  formElements,
  submissions,
}: SubmissionsTableProps) {
  const router = useRouter();

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TEXTFIELD": {
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label || "",
          required: element.extraAttributes?.required || false,
          type: element.type,
        });
        break;
      }
      case "NUMBERFIELD": {
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label || "",
          required: element.extraAttributes?.required || false,
          type: element.type,
        });
        break;
      }
      case "TEXTAREAFIELD": {
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label || "",
          required: element.extraAttributes?.required || false,
          type: element.type,
        });
        break;
      }
      default:
        break;
    }
  });

  const rows: Row[] = [];

  submissions.forEach((submission: any) => {
    const content = JSON.parse(submission?.submission ?? []);
    rows.push({
      ...content,
      status: submission?.status,
      createdAt: submission?.createdAt,
      _id: submission?._id,
    });
  });

  const changeStatus = async (id: string, status: string) => {
    if (!id) return;
    const entry = submissions.find((entry: any) => entry._id === id);
    if (!entry) return;
    const { _id, ...entryWithoutId } = entry;
    await updateEntry(_id, {
      ...entryWithoutId,
      status,
    })
      .then(() => {
        toast({
          title: "Status updated",
          description: "Status has been updated successfully",
        });

        router.refresh();
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Error updating status",
          variant: "destructive",
        });
      });
  };

  return (
    <div>
      <div className="">
        <h2 className="text-lg lg:text-2xl font-bold">Submission</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id} className="uppercase">
                {column.label}
              </TableHead>
            ))}
            <TableHead className="uppercase">Submited At</TableHead>
            <TableHead className="uppercase">Status</TableHead>
            <TableHead className="uppercase">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <RowCell
                  key={column.id}
                  type={column.type}
                  value={row[column.id]}
                />
              ))}
              <RowCell
                type="TEXTFIELD"
                value={formatDistance(new Date(row.createdAt), new Date(), {
                  addSuffix: true,
                })}
              />
              <RowCell type="TEXTFIELD" value={row.status} />
              <TableCell className="flex gap-x-2">
                {/* <Link href={`tel:+91${row["Mobile Number"]}`}>
                  <Button size="sm" variant="link">
                    Call
                  </Button>
                </Link> */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="link">
                      Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => changeStatus(row._id, "NEW")}
                    >
                      New
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => changeStatus(row._id, "IN_PROGRESS")}
                    >
                      In progress
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => changeStatus(row._id, "CONFIRMED")}
                    >
                      Confirmed
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  const node: ReactNode = value;
  return <TableCell>{node}</TableCell>;
}
