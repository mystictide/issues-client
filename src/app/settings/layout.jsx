import ToastUI from "@/components/client/ui/toast";
import { Suspense } from "react";
import Loading from "../loading";

export default function RootLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="main-container">
        <ToastUI />
        {children}
      </div>
    </Suspense>
  );
}
