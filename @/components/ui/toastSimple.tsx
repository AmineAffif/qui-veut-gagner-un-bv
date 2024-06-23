"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function ToastSimple() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
          style: { backgroundColor: "green", color: "white" }, // Custom style for success
        });
      }}
    >
      Show Toast
    </Button>
  );
}
