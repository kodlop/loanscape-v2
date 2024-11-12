import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type ContactCardProps = {
  className?: string;
};

export function ContactCard({ className }: ContactCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>Contact</CardTitle>
        <CardDescription>
          If you have any questions, feel free to contact us.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Link href="mailto:dev.kodlop@gmail.com" target="_blank">
          <Button variant="outline" size="sm" className="w-full">
            Write a mail ✉️
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
