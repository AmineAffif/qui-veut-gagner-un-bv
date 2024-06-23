"use client";

import { Button } from "@/components/ui/button";

import { toast, useToast } from "@/components/ui/use-toast";
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
