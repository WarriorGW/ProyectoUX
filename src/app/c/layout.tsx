import BodyWrapper from "@/components/BodyWrapper"

function layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <BodyWrapper>{children}</BodyWrapper>
}

export default layout
