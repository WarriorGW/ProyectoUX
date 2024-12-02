import BodyWrapper from "@/components/BodyWrapper"

function Layout({ children }: { children: React.ReactNode }) {
  return <BodyWrapper className='flex'>{children}</BodyWrapper>
}

export default Layout
