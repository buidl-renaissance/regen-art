import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Generate a unique filename
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
  const filename = `profile-picture-${uniqueSuffix}.jpg`

  // Save the file
  const path = join(process.cwd(), "public", "uploads", filename)
  await writeFile(path, buffer)

  // Return the URL of the uploaded file
  const url = `/uploads/${filename}`

  return NextResponse.json({ url })
}

