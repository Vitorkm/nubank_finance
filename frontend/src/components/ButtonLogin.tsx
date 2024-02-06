'use client'
import { Button, useDisclosure } from "@nextui-org/react";
import Login from "./Login";
import { ComponentProps } from "react";


export type ButtonLoginProps = ComponentProps<'button'> & {
  color: string;
  variant: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function ButtonLogin(ButtonLoginProps: ButtonLoginProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
    <Button
        onPress={onOpen}
         className={ButtonLoginProps.className}
         color={ButtonLoginProps.color}
         variant={ButtonLoginProps.variant}
         href={ButtonLoginProps.href}>
          {ButtonLoginProps.children}
        </Button>
        <Login isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
        </>
  )
}