import { Navigate, useLocation } from "react-router-dom";

/** Kept so existing Stripe success URLs still land on the public thank-you page. */
const PaymentComplete = () => {
  const { search } = useLocation();
  return <Navigate to={`/thank-you${search}`} replace />;
};

export default PaymentComplete;
