import BaseLayout from "@/components/BaseLayout";

export default function SandboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseLayout>
      {children}
    </BaseLayout>
  );
}
