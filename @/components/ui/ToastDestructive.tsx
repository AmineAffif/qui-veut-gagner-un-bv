// components/ToastDestructive.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function ToastDestructive() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          style: { backgroundColor: "red", color: "white" }, // Custom style for error
        });
      }}
    >
      Show Toast
    </Button>
  );
}
