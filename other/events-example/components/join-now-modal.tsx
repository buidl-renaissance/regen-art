import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

export function JoinNowModal({ className }: { className?: string }) {
  const [email, setEmail] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the email submission to your backend
    console.log("Email submitted:", email)
    toast({
      title: "Success!",
      description: "You've successfully joined our community. Check your email for further instructions.",
    })
    setEmail("")
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} className={className}>
      <DialogTrigger asChild>
        <Button className={className}>
          <UserPlus className="mr-2 h-4 w-4" /> Join Our Community
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Our Creative Community</DialogTitle>
          <DialogDescription>
            Connect with fellow creatives, attend exclusive events, and shape the future of Detroit's art scene.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleJoin} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">
            <UserPlus className="mr-2 h-4 w-4" /> Join
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

