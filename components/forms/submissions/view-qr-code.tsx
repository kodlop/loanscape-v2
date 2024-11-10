"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrCode } from "lucide-react";
import Link from "next/link";

export function ViewQRCode(props: { formCode: string }) {
  const shareLink = `${window.location.origin}/submit/${props.formCode}`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <QrCode className="h-4 w-4 mr-0.5" />
          View QR Code
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
        </DialogHeader>
        <div>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${shareLink}`}
            alt="qr-code"
            className="w-full aspect-square mx-auto"
          />
        </div>
        <DialogFooter>
          <DialogDescription>
            Share this QR code to get more submissions{" "}
            <Link
              download={true}
              href={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${shareLink}`}
              target="_blank"
            >
              <Button variant="link" size="sm">
                Download
              </Button>
            </Link>
          </DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
