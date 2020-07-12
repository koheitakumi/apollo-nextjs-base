import React, { useState, useRef } from "react";
import Link from "next/link";
import { useUser } from "hooks/useUser";
import { useRouter } from "next/router";
import {
  useLoginMutation,
  useSignUpMutation,
} from "libs/graphql/generated/graphql";
import cookie from "js-cookie";

interface Props {
  type: "SignUp" | "Login";
}

const Authentication = ({ type }: Props) => {
  const { user } = useUser();
  const router = useRouter();

  const [signUpMutation] = useSignUpMutation();
  const [loginMutation] = useLoginMutation();

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<any>(null);

  const handleAuthentication = async () => {
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    if (!email || !password) {
      setMessage({ message: "Please input email and password" });
      return;
    }
    const variables = {
      user: {
        email,
        password,
      },
    };

    try {
      const user = { email: "", token: "" };
      if (type === "Login") {
        const result = (await loginMutation({ variables })).data;
        if (result && result["login"]) {
          user.email = result["login"]["email"];
          user.token = result["login"]["token"];
        }
      } else if (type === "SignUp") {
        const result = (await signUpMutation({ variables })).data;
        if (result && result["signUp"]) {
          user.email = result["signUp"]["email"];
          user.token = result["signUp"]["token"];
        }
      }
      cookie.set(process.env.NEXT_PUBLIC_AUTH_USER_INFO!, user, {
        expires: 1,
      });
      router.push("/");
    } catch (err) {
      setMessage({ message: err.message });
      return;
    }
  };

  return (
    <div>
      {user && (
        <p>
          You are signed in.{" "}
          <Link href={"/"}>
            <a>Please Go to Main page</a>
          </Link>
        </p>
      )}
      {!user && (
        <>
          <div>
            <h2>Please {type}</h2>
            <p>{message ? JSON.stringify(message) : ""}</p>
            <input type="text" placeholder="email" ref={emailRef} />
            <input type="password" placeholder="password" ref={passRef} />
            <button onClick={handleAuthentication}>{type}</button>
          </div>
          <div>
            {type === "Login" && (
              <p>
                You don't have your account yet,{" "}
                <Link href={"/signup"}>
                  <a>Let's Sign Up</a>
                </Link>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Authentication;
