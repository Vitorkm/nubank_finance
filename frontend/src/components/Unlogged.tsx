'use client'
import { Button, useDisclosure } from "@nextui-org/react";
import Login from "./Login";


export default function Unlogged() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-y-5 h-[calc(100vh-150px)]  items-center justify-center tracking-widest leading-loose font-mono text-4xl">
        <p className="animate-slidein [--slidein-delay:300ms] opacity-0">Connect your </p>
        <p className="font-bold animate-slidein [--slidein-delay:500ms] opacity-0 text-purple-700">account</p>
        <p className="animate-slidein [--slidein-delay:700ms] opacity-0">to start analysis</p>
        <Button
        onPress={onOpen}
         className="animate-slidein [--slidein-delay:700ms] opacity-0" color="secondary" variant="shadow" href="#">
          Get started >
        </Button>
        <Login isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
      </div>
  )
}