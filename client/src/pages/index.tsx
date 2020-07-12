import React from "react";
import Link from "next/link";
import { useUser } from "hooks/useUser";
import TodoList from "components/TodoList";

const Index = () => {
  const { user, logout } = useUser();

  if (!user) {
    return (
      <>
        <p>Hi there!</p>
        <p>
          You are not signed in.{" "}
          <Link href={"/login"}>
            <a>Please Login</a>
          </Link>
        </p>
        <p>
          You don't have your account yet,{" "}
          <Link href={"/signup"}>
            <a>Let's Sign Up</a>
          </Link>
        </p>
      </>
    );
  }
  return (
    <>
      <p>You're signed in. Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
      <TodoList />
    </>
  );
};

export default Index;
