// FILE: src/config/paymentConfig.js
// USE IN: Both mycarehub-mobile AND mycarehub-web
// PURPOSE: Payment configuration with Paystack disabled for now

const PAYSTACK_ENABLED = false; // Change to true when ready to enable payments

const paystackConfig = {
  enabled: PAYSTACK_ENABLED,
  publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxx',
  testMode: true, // Always test until you go live
  currency: 'NGN',
  country: 'NG',
};

export default paystackConfig;

