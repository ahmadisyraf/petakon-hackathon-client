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
    <Card size="md" variant="elevated" className="m-3 p-5">
      <Heading size="2xl" className="mb-1">
        {title}
      </Heading>
      <Text size="xl">{description}</Text>
      {children}
    </Card>
  );
}
