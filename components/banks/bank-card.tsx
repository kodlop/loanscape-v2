"use client";

import { Bank } from "@/types/bank";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { AlertCircle, File, HandCoins, MoreVertical } from "lucide-react";
import Link from "next/link";
import { deleteBank } from "@/server/bank";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { BANK_INSTIUTION_TYPES, BANKS } from "@/data/constants";

interface BankCardProps {
  bank: Bank;
}

export function BankCard({ bank }: BankCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteBank(bank?._id as string)
      .then(() => {
        toast({
          title: "Bank deleted successfully",
          description: `Bank ${bank.name} has been deleted`,
        });
        router.refresh();
      })
      .catch((error) => {
        toast({
          title: "Error deleting bank",
          description: error.message,
          variant: "destructive",
        });
      });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center bg-muted/50">
        <img
          src={
            BANKS.find((b) => b.value === bank.code)?.logo ?? "/logo-mark.png"
          }
          alt="Peinvoice"
          className="h-12 w-12 rounded-lg bg-white p-2"
        />
        <div className="ml-4">
          <CardTitle className="text-md">{bank.name}</CardTitle>
          <CardDescription className="text-xs">
            {
              BANK_INSTIUTION_TYPES.find(
                (b) => b.value === bank.institution_type
              )?.label
            }
          </CardDescription>
        </div>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/banks/edit/${bank?._id}?tab=general`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <dl className="grid grid:cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <dt className="flex items-center gap-2 font-semibold">
              <File className="h-3 w-3" />
              Rate
            </dt>
            <dd className="text-muted-foreground ml-5">{bank.rate}</dd>
          </div>
          <div className="flex flex-col">
            <dt className="flex items-center gap-2 font-semibold">
              <HandCoins className="h-3 w-3" />
              Fees
            </dt>
            <dd className="text-muted-foreground ml-5">₹{bank.fees}</dd>
          </div>
          <div className="flex flex-col">
            <dt className="flex items-center gap-2 font-semibold">
              <AlertCircle className="h-3 w-3" />
              Payment Plan
            </dt>
            <dd className="text-muted-foreground ml-5">{bank.payment_plan}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
