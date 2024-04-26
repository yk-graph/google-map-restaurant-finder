"use client";

import { useEffect } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "@/providers/session-provider";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <SessionProvider>
      <div className="flex flex-col justify-center items-center mt-[10%] gap-10">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
        <div className="px-6 sm:px-0 max-w-sm ">
          <button
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
              })
            }
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </SessionProvider>
  );
};

export default Login;
