import { useCallback } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export function useSignInWithPhoneNumber(
  getRecaptchaVerifier: () => RecaptchaVerifier
) {
  return useCallback(
    (phoneNumber: string) =>
      signInWithPhoneNumber(getAuth(), phoneNumber, getRecaptchaVerifier()),
    [getRecaptchaVerifier]
  );
}
