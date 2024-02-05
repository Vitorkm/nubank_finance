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
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";
import useNubankContext from "@/hooks/useNubankContext";
import qrcode from "qrcode";

interface NuCredentials {
  cpf: string;
  password: string;
}

export default function Login(props: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
}) {
  const { isOpen, onOpen, onOpenChange } = props;
  const { register, handleSubmit } = useForm<NuCredentials>();
  const NuBank = useNubankContext();
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const onSubmit: SubmitHandler<NuCredentials> = async (data) => {
    console.log(data);
    setSubmitted(true);
    generateQrCode(data);
  };

    async function QrCodeNuBank(NuCredentials: NuCredentials, authCode: string) {
        console.log('entrei')
        try {
          await NuBank.auth.authenticateWithQrCode(
            NuCredentials.cpf,
            NuCredentials.password,
            authCode
          );
          console.log("Successfully authenticated!");
          console.log(NuBank.authState);
          localStorage.setItem("auth-code", authCode);
          setSubmitted(false);
        } catch (error) {
          console.error("Authentication error:", error);
          console.log(NuBank.authState);
          // Retry authentication after a delay
          setTimeout(() => QrCodeNuBank(NuCredentials, authCode), 5000); // 5 seconds
        } 
      }
  
    async function generateQrCode(NuCredentials: NuCredentials) {
      const AUTH_CODE: string = uuidv4();
  
      qrcode.toDataURL(AUTH_CODE, (err, url) => {
        if (err) {
          console.error("Error generating QR code: ", err);
          return;
        }
        localStorage.setItem('qrcode-url', url);
        QrCodeNuBank(NuCredentials, AUTH_CODE);
      });
    };


  return (
    <>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        onOpenChange={onOpenChange}
        className="transition-all"
        placement="top-center"
      >
        {submitted ? (
          <ModalContent>
            {(onClose) => (
                <>
            <ModalHeader>Scan the QR Code in the NuBank App</ModalHeader>
            <ModalBody>
            {localStorage.getItem("qrcode-url") && <img src={localStorage.getItem("qrcode-url")} className="rounded-3xl" alt="QR Code" />}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={() => setSubmitted(false)}>
                Go Back
              </Button>
              <Button color="secondary" onPress={onClose}>
                Scanned
              </Button>
            </ModalFooter>
            </>)}
          </ModalContent>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Log in
                  </ModalHeader>
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
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="secondary" type="submit">
                      Sign in
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </form>
        )}
      </Modal>
    </>
  );
}
