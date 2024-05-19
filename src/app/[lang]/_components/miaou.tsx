import React from 'react'
import type { RouterOutputs } from '@/trpc/react'
import type {Dictionary} from "@/lib/dictionary"

function miaou({data}:{data:RouterOutputs["post"]["getLatest"], text:Dictionary["landing"]}) {
  return (
    <div>{data?.name}</div>
  )
}

export default miaou



