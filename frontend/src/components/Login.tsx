import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { User } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";
import useNubankContext from "@/hooks/useNubankContext";
import qrcode from "qrcode";
import { api } from "@/app/api/api";

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
  const { authToken, setAuthToken } = useNubankContext();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [qrcodeUrl, setQRCodeUrl] = useState<string | null>(null);
  const onSubmit: SubmitHandler<NuCredentials> = async (data) => {
    console.log(data);
    setSubmitted(true);
    api.post(
      "AJxL5LBUC2Tx4PB-W6VD1SEIOd2xp14EDQ.aHR0cHM6Ly9wcm9kLWdsb2JhbC1hdXRoLm51YmFuay5jb20uYnIvYXBpL3Rva2Vu",
       { "client_id": "other.conta",
        "client_secret": "yQPeLzoHuJzlMMSAjC-LgNUJdUecx8XO",
        "grant_type": "password",
        "login": data.cpf,
        "password": data.password,
      }
    ).then((response) => {
      localStorage.setItem("access_token", response.data.access_token)
      console.log(response.data);
      generateQrCode(data);
    });
    // generateQrCode(data);
  };

  function QrCodeNuBank(NuCredentials: NuCredentials) {
    console.log("entrei");
    api.post("AJxL5LD1_tXTsdl5luooo69vWaMYPjMJww.aHR0cHM6Ly9wcm9kLWdsb2JhbC1hdXRoLm51YmFuay5jb20uYnIvYXBpL2xpZnQ",
      {
        "qr_code_id": localStorage.getItem("qrcode"),
        "type": "login-webapp"
      },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      }
      ).then((response) => {
      console.log(response.data);
      setSubmitted(false);
      localStorage.setItem("access_token", response.data.access_token)
      
      }
      ).catch((error) => {
          console.error("Authentication error:", error);
          setTimeout(() => QrCodeNuBank(NuCredentials), 5000); // 5 seconds
      });
  };

  function generateQrCode(NuCredentials: NuCredentials) {
    const AUTH_CODE: string = uuidv4();

    qrcode.toDataURL(AUTH_CODE, (err, url) => {
      if (err) {
        console.error("Error generating QR code: ", err);
        return;
      }
      setQRCodeUrl(url);
      localStorage.setItem("qrcode", AUTH_CODE);
      QrCodeNuBank(NuCredentials);
    });
  }

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
                  {qrcodeUrl && (
                    <img
                      src={qrcodeUrl}
                      className="rounded-3xl"
                      alt="QR Code"
                    />
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => setSubmitted(false)}
                  >
                    Go Back
                  </Button>
                  <Button color="secondary" onPress={onClose}>
                    Scanned
                  </Button>
                </ModalFooter>
              </>
            )}
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
