"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ShareTransactionModalProps = {
  propertyName: string;
  availableShares: number;
  pricePerShare: number;
  onTransaction: (shares: number) => void;
}

export function ShareTransactionModal({ propertyName, availableShares, pricePerShare, onTransaction }: ShareTransactionModalProps) {
  const [shares, setShares] = useState(1)

  const handleTransaction = () => {
    onTransaction(shares)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Buy Shares</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy Shares</DialogTitle>
          <DialogDescription>
            Purchase shares for {propertyName}. Available shares: {availableShares}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shares" className="text-right">
              Shares
            </Label>
            <Input
              id="shares"
              type="number"
              className="col-span-3"
              value={shares}
              onChange={(e) => setShares(parseInt(e.target.value))}
              min={1}
              max={availableShares}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Total Cost</Label>
            <div className="col-span-3">${shares * pricePerShare}</div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleTransaction}>Confirm Purchase</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

