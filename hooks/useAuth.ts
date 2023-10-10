"use client";
import React from "react";

import { verifyJwtToken } from "@/lib/jwtFunctions";

export function useAuth({ token }: { token: string }) {
  const [auth, setAuth] = React.useState<any>(null);

  const getVerifiedtoken = async () => {
    const verifiedToken = await verifyJwtToken(token);
    setAuth(verifiedToken);
  };
  React.useEffect(() => {
    getVerifiedtoken();
  }, []);
  return auth;
}
