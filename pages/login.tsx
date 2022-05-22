import { useState } from "react";
import type { ConfirmationResult } from "firebase/auth";
import { useRouter } from "next/router";
import { CodeForm } from "@p-features/login/components/code-form";
import { PhoneForm } from "@p-features/login/components/phone-form";
import { useAuth } from "@p-features/login/hooks/use-auth";

function Login() {
  const [result, setResult] = useState<ConfirmationResult>();
  const router = useRouter();
  const auth = useAuth("redirect-if-auth");

  const handleCodeFormSubmit = () => {
    router.push("/");
  };

  if (!auth.initialized) {
    return <h1>Loading...</h1>;
  }

  return result ? (
    <CodeForm result={result} onSubmit={handleCodeFormSubmit} />
  ) : (
    <PhoneForm onSubmit={setResult} />
  );
}

export default Login;
