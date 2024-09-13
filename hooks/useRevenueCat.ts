import { useState, useEffect } from "react";

// Mock data
const mockOffering = {
  identifier: "default",
  availablePackages: [
    { identifier: "monthly", product: { price: 9.99, priceString: "$9.99" } },
    { identifier: "annual", product: { price: 99.99, priceString: "$99.99" } },
    {
      identifier: "lifetime",
      product: { price: 299.99, priceString: "$299.99" },
    },
  ],
};

export function useRevenueCat() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const purchasePackage = async (pack: any) => {
    // Simulate purchase
    console.log("Purchased package:", pack.identifier);
    return { customerInfo: {}, productIdentifier: pack.identifier };
  };

  const restorePurchases = async () => {
    // Simulate restore
    console.log("Purchases restored");
    return {};
  };

  return {
    offerings: { current: mockOffering },
    currentOffering: mockOffering,
    purchasePackage,
    restorePurchases,
    isLoading,
    error,
  };
}
