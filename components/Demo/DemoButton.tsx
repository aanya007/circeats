"use client";

import Button from "../ui/Button";
import { useDemo } from "./DemoContext";

interface DemoButtonProps {
  variant?: "primary" | "lime" | "orange";
  children?: React.ReactNode;
}

export default function DemoButton({
  variant = "orange",
  children = "Book a Demo →",
}: DemoButtonProps) {
  const { open } = useDemo();
  return (
    <Button variant={variant} onClick={open}>
      {children}
    </Button>
  );
}
