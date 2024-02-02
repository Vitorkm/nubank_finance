import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { User } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import createNuBank from 'nubank';
import { useForm, SubmitHandler } from "react-hook-form";

interface NuCredentials {
  cpf: number;
  password: string;
}


export default function Login(props: { isOpen: boolean; onOpen: () => void; onOpenChange: (open: boolean) => void }) {
  const { isOpen, onOpen, onOpenChange } = props;
  const { register, handleSubmit } = useForm<NuCredentials>();
  const onSubmit: SubmitHandler<NuCredentials> = (data) => {
    console.log(data);
    testeNuBank(data);
  };

  const NuBank = createNuBank();
  function testeNuBank(NuCredentials: NuCredentials) {
    console.log('oi')
    NuBank.getLoginToken({
      login: NuCredentials.cpf,
      password: NuCredentials.password
    }).then((token) => console.log('token Nu', token));
  };

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur"  onOpenChange={onOpenChange} placement="top-center">
        <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <User className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  {...register("cpf")}
                  label="CPF"
                  placeholder="Enter your CPF"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockKeyhole className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  {...register("password")}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="secondary" type="submit" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </form>
      </Modal>
    </>
  );
}
