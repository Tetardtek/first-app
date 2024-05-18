import React from 'react'
import type { RouterOutputs } from '@/trpc/react'

function miaou({data}:{data:RouterOutputs["post"]["getLatest"]}) {
  return (
    <div>{data?.name}</div>
  )
}

export default miaou



