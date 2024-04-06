import { Body } from "@react-email/body";
import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";

export default function VerifyEmail({
  code,
  url,
}: {
  code: number;
  url: string;
}) {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className=" text-center  my-[40px] mx-auto p-[20px] w-[465px] flex flex-col items-center justify-center">
            <Text className="text-2xl text-center text-slate-800 font-medium font-sans">
              Verify Email for Taskation
            </Text>

            <Text className="text-lg text-center text-gray-300 px-6 hover:text-slate-800 hover:bg-gray-300  transition-all ease-in-out duration-300 hover:cursor-pointer rounded-md w-fit mx-auto py-2 bg-slate-800 font-medium font-sans">
              Your Code is: {code}
            </Text>

            <Text className="text-2xl text-center text-slate-800 font-medium font-sans">
              OR
            </Text>
            <Text className="text-2xl text-center text-slate-800 font-medium font-sans">
              Click the Button Below
            </Text>
            <Button
              style={{
                padding: "20px 12px",
              }}
              className="text-lg text-center text-gray-300 px-6 hover:text-slate-800 hover:bg-gray-300  transition-all ease-in-out duration-300 hover:cursor-pointer rounded-md w-fit mx-auto py-2 bg-slate-800 font-medium font-sans"
              href={url}
            >
              Redirect to Page
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
