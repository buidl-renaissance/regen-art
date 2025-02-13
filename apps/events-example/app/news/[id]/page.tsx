'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Newspaper, Calendar, ThumbsUp, MessageSquare, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

// This would typically come from an API or database
const article = {
  id: 1,
  title: "Detroit's Creative Scene Continues to Thrive in 2024",
  content: `
    <p>Detroit's artistic landscape is experiencing a remarkable renaissance, with new galleries, music venues, and creative spaces sprouting up across the city. This surge in cultural growth is not just revitalizing neighborhoods but also attracting artists and creatives from around the world, further cementing Detroit's status as a hub for innovation and artistic expression.</p>
    
    <h2>The Rise of New Art Spaces</h2>
    <p>In the past year alone, Detroit has seen the opening of over a dozen new art galleries, each bringing its unique flavor to the city's art scene. From contemporary art spaces in repurposed industrial buildings to intimate galleries showcasing local talent, these new venues are providing diverse platforms for artists to showcase their work.</p>
    
    <h2>Music Venues Amplifying Detroit's Sound</h2>
    <p>The city's rich musical heritage continues to evolve with the introduction of new music venues. These spaces range from intimate jazz clubs to large-scale concert halls, catering to a wide array of musical tastes and further solidifying Detroit's reputation as a music mecca.</p>
    
    <h2>Creative Hubs Fostering Collaboration</h2>
    <p>Perhaps most exciting is the emergence of multi-disciplinary creative hubs. These spaces are designed to foster collaboration between artists, musicians, designers, and other creatives. By providing shared workspaces, resources, and opportunities for cross-pollination of ideas, these hubs are becoming incubators for the next wave of Detroit's creative output.</p>
    
    <h2>Impact on the Community</h2>
    <p>The flourishing creative scene is having a profound impact on Detroit's communities. It's not only beautifying neighborhoods and providing cultural enrichment but also creating jobs and attracting tourism. Local businesses, particularly in the hospitality sector, are seeing increased foot traffic as art enthusiasts and music lovers flock to these new cultural hotspots.</p>
    
    <h2>Looking Ahead</h2>
    <p>As we move further into 2024, the momentum shows no signs of slowing. With several more galleries and venues slated to open in the coming months, and a calendar packed with art fairs, music festivals, and cultural events, Detroit's creative renaissance is set to reach new heights. The city is not just reclaiming its title as a cultural powerhouse; it's redefining what that means for the 21st century.</p>
  `,
  author: "Emily Rodriguez",
  authorImage: "/placeholder.svg?height=40&width=40",
  date: "May 15, 2024",
  source: "Detroit Arts Weekly",
  image: "/placeholder.svg?height=400&width=800",
  likes: 245,
  comments: [
    { id: 1, user: "John Doe", avatar: "/placeholder.svg?height=40&width=40", content: "This is really exciting news for Detroit!", timestamp: "2 hours ago" },
    { id: 2, user: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40", content: "I can't wait to visit some of these new galleries!", timestamp: "1 hour ago" },
  ]
}

export default function NewsArticlePage() {
  const [likes, setLikes] = useState(article.likes)
  const [hasLiked, setHasLiked] = useState(false)
  const [comments, setComments] = useState(article.comments)
  const [newComment, setNewComment] = useState("")

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setHasLiked(!hasLiked)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        content: newComment,
        timestamp: "Just now"
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-primary hover:underline mb-4 inline-block">
            &larr; Back to Home
          </Link>
          
          <article className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Newspaper className="w-4 h-4" />
                <span>{article.source}</span>
                <span>•</span>
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <h1 className="text-3xl font-bold">{article.title}</h1>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={article.authorImage} alt={article.author} />
                  <AvatarFallback>{article.author[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{article.author}</span>
              </div>
            </div>

            <div className="relative aspect-video">
              <Image
                src={article.image}
                alt="Article featured image"
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

            <div className="flex items-center gap-4 py-4 border-t border-b">
              <Button variant="outline" onClick={handleLike}>
                <ThumbsUp className={`w-4 h-4 mr-2 ${hasLiked ? 'fill-current' : ''}`} />
                {likes}
              </Button>
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                {comments.length}
              </Button>
              <div className="ml-auto flex gap-2">
                <Button variant="outline" size="icon">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Comments</h2>
              <form onSubmit={handleCommentSubmit} className="space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button type="submit">Post Comment</Button>
              </form>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={comment.avatar} alt={comment.user} />
                          <AvatarFallback>{comment.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{comment.user}</span>
                            <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p>{comment.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  )
}

