import { useCallback, useState } from "react";
import { getAuth, User } from "firebase/auth";
import { useRouter } from "next/router";
import { useMemoRef, useOnMount } from "@p/hooks";

type Mode = "redirect-if-anon" | "redirect-if-auth";
type Auth =
  | {
      user: null;
      initialized: false;
      signOut(): void;
    }
  | {
      user: User | null;
      initialized: true;
      signOut(): void;
    };

export function useAuth(mode?: Mode) {
  const router = useRouter();
  const _ = useMemoRef(() => ({ router, mode }), [router, mode]);
  const signOut = useCallback(() => getAuth().signOut(), []);

  const [user, setUser] = useState<Auth>({
    user: null,
    initialized: false,
    signOut,
  });

  useOnMount(() => {
    let isFirst = true;
    return getAuth().onAuthStateChanged((newUser) => {
      if (isFirst) {
        isFirst = false;
        if (_.current.mode === "redirect-if-anon" && !newUser) {
          const { pathname, search } = window.location;
          _.current.router.push({
            pathname: "/login",
            query: { r: `${pathname}${search}` },
          });
        } else if (_.current.mode === "redirect-if-auth" && newUser) {
          const r = Array.isArray(_.current.router.query.r)
            ? _.current.router.query.r[0]
            : _.current.router.query.r ?? "/";
          _.current.router.push(r);
        }
      }
      setUser({ user: newUser, initialized: true, signOut });
    });
  });

  return user;
}
