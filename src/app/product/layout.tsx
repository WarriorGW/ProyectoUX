import BodyWrapper from "@/components/BodyWrapper"
import React from "react"

function layout({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}

export default layout
