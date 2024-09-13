import { useState, useEffect } from "react";

interface MockCustomerInfo {
  entitlements: {
    active: {
      pro?: boolean;
    };
  };
}

interface MockOffering {
  availablePackages: Array<{
    product: {
      priceString: string;
    };
  }>;
}

export function useMockRevenueCat() {
  const [customerInfo, setCustomerInfo] = useState<MockCustomerInfo | null>(
    null
  );
  const [currentOffering, setCurrentOffering] = useState<MockOffering | null>(
    null
  );

  useEffect(() => {
    // Simulate async initialization
    setTimeout(() => {
      setCustomerInfo({
        entitlements: {
          active: {
            pro: false,
          },
        },
      });
      setCurrentOffering({
        availablePackages: [
          {
            product: {
              priceString: "$9.99",
            },
          },
        ],
      });
    }, 1000);
  }, []);

  const purchasePackage = async () => {
    // Simulate a purchase
    return new Promise<MockCustomerInfo>((resolve) => {
      setTimeout(() => {
        const newInfo = {
          entitlements: {
            active: {
              pro: true,
            },
          },
        };
        setCustomerInfo(newInfo);
        resolve(newInfo);
      }, 1000);
    });
  };

  return { customerInfo, currentOffering, purchasePackage };
}
