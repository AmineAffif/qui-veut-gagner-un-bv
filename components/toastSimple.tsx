"use client";

import { Button } from "@/components/ui/button";
import useToast from "@radix-ui/react-toast";

import { toast } from "@radix-ui/react-toast";
export function ToastSimple() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        });
      }}
    >
      Show Toast
    </Button>
  );
}
