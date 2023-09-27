"use client";

import { getProviders, signIn, useSession } from "next-auth/react";
import { LoginButton } from "@telegram-auth/react";

const AuthForm = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      {/* {Object.values(providers || {}).map((provider) => {
        return (
          <LoginButton
            key={provider.name}
            botUsername="fm-hot-deal-bot"
            onAuthCallback={(data) => {
              signIn(provider.id, { callbackUrl: "/" }, data as any);
            }}
          />
        );
      })} */}
      <LoginButton
        botUsername={"fm_hot_deal_bot"}
        onAuthCallback={(data: any) => {
          signIn("telegram-login", { callbackUrl: "/" }, data as any);
        }}
      />
    </div>
  );
};

export default AuthForm;
