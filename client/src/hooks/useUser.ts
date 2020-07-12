import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import { User, useLogoutMutation } from "libs/graphql/generated/graphql";

const AUTH_USER_INFO = process.env.NEXT_PUBLIC_AUTH_USER_INFO!;

const useUser = () => {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const [logoutMutation] = useLogoutMutation();

  const logout = async () => {
    const result = await logoutMutation();
    if (result.data && result.data["logout"]) {
      cookies.remove(AUTH_USER_INFO);
      router.push("/login");
    }
  };

  useEffect(() => {
    const cookie = cookies.get(AUTH_USER_INFO);
    if (!cookie) {
      return;
    }
    setUser(JSON.parse(cookie));
  }, []);

  return { user, logout };
};

export { useUser };
