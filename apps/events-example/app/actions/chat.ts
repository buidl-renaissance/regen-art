'use server'

export async function sendMessage(formData: FormData) {
  const message = formData.get('message')
  
  // Simulate saving the message
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    success: true,
    message: 'Message sent successfully'
  }
}

