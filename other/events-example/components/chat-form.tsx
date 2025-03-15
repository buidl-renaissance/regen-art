'use client'

import { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'
import { useActionState } from 'react'
import { sendMessage } from '@/app/actions/chat'

export function ChatForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, action, isPending] = useActionState(sendMessage)

  return (
    <form 
      ref={formRef}
      action={async (formData) => {
        await action(formData)
        formRef.current?.reset()
      }}
      className="flex gap-4"
    >
      <Input 
        name="message"
        placeholder="What Up Doe?..." 
        className="flex-1"
        disabled={isPending}
      />
      <Button type="submit" disabled={isPending}>
        <Send className="w-4 h-4 mr-2" />
        Send
      </Button>
    </form>
  )
}

