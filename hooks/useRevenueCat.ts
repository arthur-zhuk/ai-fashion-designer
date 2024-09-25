import { useEffect, useState } from "react";
import { Purchases, Offerings, PurchasesError } from "react-native-purchases";

export const useRevenueCat = () => {
  const [offerings, setOfferings] = useState<Offerings | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Purchases.getOfferings()
      .then((offerings) => {
        setOfferings(offerings);
        setIsLoading(false);
      })
      .catch((e: PurchasesError) => {
        setError(e.message);
        setIsLoading(false);
      });
  }, []);

  const purchasePackage = async (pkg: Purchases.Package) => {
    try {
      const purchase = await Purchases.purchasePackage(pkg);
      return purchase;
    } catch (e) {
      throw e;
    }
  };

  return {
    currentOffering: offerings?.current,
    isLoading,
    error,
    purchasePackage,
  };
};
