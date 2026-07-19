"use client";

import Button from "../ui/Button";
import { useWaitlist } from "./WaitlistContext";

interface WaitlistButtonProps {
  variant?: "primary" | "lime" | "orange";
  children?: React.ReactNode;
}

export default function WaitlistButton({
  variant = "primary",
  children = "Join Waitlist",
}: WaitlistButtonProps) {
  const { open } = useWaitlist();
  return (
    <Button variant={variant} onClick={open}>
      {children}
    </Button>
  );
}
