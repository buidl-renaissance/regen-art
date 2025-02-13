'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function UpVoteButton() {
  const [hasVoted, setHasVoted] = useState(false)

  return (
    <Button
      size="lg"
      variant="secondary"
      className="bg-[#1a1f2e] hover:bg-[#252b3d] text-white w-32"
      onClick={() => setHasVoted(!hasVoted)}
      disabled={hasVoted}
    >
      {hasVoted ? 'VOTED' : 'UP VOTE'}
    </Button>
  )
}

