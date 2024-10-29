import { ReactNode } from "react";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";

interface CardContainerProps {
  children: ReactNode;
  title: string;
  description: string;
}

export default function CardContainer({
  children,
  title,
  description,
}: CardContainerProps) {
  return (
    <Card size="md" variant="elevated" className="m-3 p-6">
      <Heading size="xl" className="mb-1">
        {title}
      </Heading>
      <Text size="md">{description}</Text>
      {children}
    </Card>
  );
}
