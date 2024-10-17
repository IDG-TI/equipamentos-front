import { useState, useEffect } from "react";
import { Bancos } from "@/types";

export const useBancos = () => {
  const [bancos, setBancos] = useState<Bancos[]>([]);

  useEffect(() => {
    const fetchBancos = async () => {
      const response = await fetch("https://brasilapi.com.br/api/banks/v1");
      const data = await response.json();
      setBancos(data);
    };
    fetchBancos();
  }, []);

  return { bancos };
};
