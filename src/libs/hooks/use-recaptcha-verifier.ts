import { RefObject, useCallback, useRef } from "react";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

export type UseRecaptchaVerifierResult<T extends keyof HTMLElementTagNameMap> = {
  verifierBoxRef: RefObject<HTMLElementTagNameMap[T]>;
  getRecaptchaVerifier(): RecaptchaVerifier;
};

export function useRecaptchaVerifier<
  T extends keyof HTMLElementTagNameMap
>(): UseRecaptchaVerifierResult<T> {
  const verifierBoxRef = useRef<HTMLElementTagNameMap[T]>(null);
  const verifierRef = useRef<RecaptchaVerifier>();
  const getRecaptchaVerifier = useCallback(() => {
    if (!verifierBoxRef.current) {
      throw new Error("verifierBoxRef is not initialized");
    }

    if (!verifierRef.current) {
      verifierRef.current = new RecaptchaVerifier(
        verifierBoxRef.current,
        {
          size: "invisible",
        },
        getAuth()
      );
    }
    return verifierRef.current;
  }, []);

  return { verifierBoxRef, getRecaptchaVerifier };
}
