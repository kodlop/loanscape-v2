import { BankCard } from "@/components/banks/bank-card";
import { buttonVariants } from "@/components/ui/button";
import { Bank } from "@/types/bank";
import { Plus } from "lucide-react";
import Link from "next/link";

const DUMMY_BANKS: Bank[] = [];

export default async function BanksPage() {
  return (
    <div className="flex-1 space-y-8">
      <div className="w-full flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Banks</h2>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/banks/add?tab=general"
        >
          <Plus className="w-4 h-4 mr-0.5" />
          Add Bank
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_BANKS.map((bank) => (
          <BankCard key={bank._id} bank={bank} />
        ))}
      </div>
    </div>
  );
}