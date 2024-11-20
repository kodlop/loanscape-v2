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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Edit } from "lucide-react";
import { downloadExcel } from "@/lib/downloadExcel";

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
      case "EMAILFIELD": {
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label || "",
          required: element.extraAttributes?.required || false,
          type: element.type,
        });
        break;
      }
      case "MOBILENUMBERFIELD": {
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label || "",
          required: element.extraAttributes?.required || false,
          type: element.type,
        });
        break;
      }
      case "SLIDERFIELD": {
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label || "",
          required: element.extraAttributes?.required || false,
          type: element.type,
        });
        break;
      }
      case "SELECTFIELD": {
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

  const handleDownloadExcel = () => {
    const data = rows.reverse().map((row, index) => {
      const newRow: any = {};
      {
        columns.map((column) => (newRow[column.label] = row[column.id]));
      }
      newRow["Submitted At"] = row?.createdAt
        ?.split("T")[0]
        .split("-")
        .reverse()
        .join("/");

      newRow["Status"] = row.status;

      return newRow;
    });
    downloadExcel("submission", data);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg lg:text-2xl font-bold">Submissions</h2>
        <Button variant="outline" onClick={handleDownloadExcel}>
          <Download className="w-4 h-4" />
          Download Excel
        </Button>
      </div>
      <div className="rounded-md border bg-card">
        <ScrollArea className="w-full">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.id} className="">
                    <Button
                      variant="ghost"
                      className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                      {column.label}
                    </Button>
                  </TableHead>
                ))}
                <TableHead className="uppercase">
                  <Button
                    variant="ghost"
                    className="-ml-3 h-8 data-[state=open]:bg-accent"
                  >
                    Submmited At
                  </Button>
                </TableHead>
                <TableHead className="uppercase">
                  <Button
                    variant="ghost"
                    className="-ml-3 h-8 data-[state=open]:bg-accent"
                  >
                    Status
                  </Button>
                </TableHead>
                <TableHead className="uppercase">
                  <Button
                    variant="ghost"
                    className="-ml-3 h-8 data-[state=open]:bg-accent"
                  >
                    Actions
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.reverse().map((row, index) => (
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
                    value={row?.createdAt
                      ?.split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")}
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
                          <Edit className="w-3 h-3" />
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
        </ScrollArea>
      </div>
    </div>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;
  if (type === "MOBILENUMBERFIELD") {
    node = (
      <Link href={`tel:+91${value}`}>
        <Button variant="link">+91 {value}</Button>
      </Link>
    );
  }
  return <TableCell>{node}</TableCell>;
}
