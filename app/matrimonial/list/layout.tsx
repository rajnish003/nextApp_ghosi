import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Matrimonial",
  description: "Login to your matrimonial account",
};

export default function ListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* You can add common elements for the login section here */}
      <main>{children}</main>
    </div>
  );
}