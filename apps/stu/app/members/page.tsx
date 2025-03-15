'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Phone, Mail, Instagram } from 'lucide-react'
import { getMembers } from '../actions'
import { Profile } from '../../lib/types'

// Mock data for members
const members = [
  {
    id: 1,
    name: "Alice Johnson",
    phone: "+1 (555) 123-4567",
    email: "alice@example.com",
    instagram: "@alice_creates",
    photo: "/placeholder.svg?height=100&width=100",
    bio: "Passionate artist specializing in abstract paintings and digital art.",
    certifications: ["Fine Arts Degree", "Digital Illustration Certificate"],
    skills: ["Oil Painting", "Digital Art", "Sculpture"],
    creativePursuits: ["Painting", "Digital Art"],
    groupFitnessActivities: ["Yoga", "Pilates", "Climbing"]
  },
  {
    id: 2,
    name: "Bob Smith",
    phone: "+1 (555) 987-6543",
    email: "bob@example.com",
    instagram: "@bob_art",
    photo: "/placeholder.svg?height=100&width=100",
    bio: "Experienced photographer with a love for landscape and portrait photography.",
    certifications: ["Professional Photography Certification", "Adobe Lightroom Expert"],
    skills: ["Portrait Photography", "Landscape Photography", "Photo Editing"],
    creativePursuits: ["Photography", "Graphic Design"],
    groupFitnessActivities: ["CrossFit", "HIIT", "Running"]
  },
  {
    id: 3,
    name: "Charlie Brown",
    phone: "+1 (555) 246-8135",
    email: "charlie@example.com",
    instagram: "@charlie_designs",
    photo: "/placeholder.svg?height=100&width=100",
    bio: "Graphic designer with 5+ years of experience in branding and web design.",
    certifications: ["Graphic Design Diploma", "UX/UI Design Certification"],
    skills: ["Adobe Creative Suite", "Web Design", "Branding"],
    creativePursuits: ["Graphic Design", "Illustration"],
    groupFitnessActivities: ["Zumba", "Spinning", "Tennis"]
  },
  {
    id: 4,
    name: "Diana Ross",
    phone: "+1 (555) 369-2580",
    email: "diana@example.com",
    instagram: "@diana_sings",
    photo: "/placeholder.svg?height=100&width=100",
    bio: "Professional singer and vocal coach with expertise in jazz and soul music.",
    certifications: ["Music Education Degree", "Vocal Performance Certificate"],
    skills: ["Vocal Coaching", "Songwriting", "Music Production"],
    creativePursuits: ["Music Production", "Dance"],
    groupFitnessActivities: ["Barre", "Yoga", "Skating"]
  },
  {
    id: 5,
    name: "Ethan Hunt",
    phone: "+1 (555) 159-7531",
    email: "ethan@example.com",
    instagram: "@ethan_creates",
    photo: "/placeholder.svg?height=100&width=100",
    bio: "Versatile filmmaker specializing in documentary and short film production.",
    certifications: ["Film Production Degree", "Video Editing Certification"],
    skills: ["Cinematography", "Video Editing", "Screenwriting"],
    creativePursuits: ["Film Making", "Photography"],
    groupFitnessActivities: ["Kickboxing", "TRX", "Ultimate"]
  },
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [members, setMembers] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const members = await getMembers();
      setMembers(members);
    };
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.handle.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Connect with Members</h1>
        <div className="mb-6">
          <Label htmlFor="search" className="text-white">Search Members</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMembers.map(member => (
            <Card key={member.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={member.profile_picture} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{member.handle}</CardTitle>
                  <CardDescription>{member.name}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div className="space-y-2">
                    {/* <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      <span>{member.phone}</span>
                    </div> */}
                    {/* <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      <span>{member.email}</span>
                    </div> */}
                    {/* <div className="flex items-center">
                      <Instagram className="mr-2 h-4 w-4" />
                      <span>{member.instagram}</span>
                    </div> */}
                  </div>
                  <div>
                    {/* <h3 className="font-semibold mb-1">Bio</h3> */}
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </div>
                  {/* <div>
                    <h3 className="font-semibold mb-1">Certifications</h3>
                    <div className="flex flex-wrap gap-1">
                      {member.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary">{cert}</Badge>
                      ))}
                    </div>
                  </div> */}
                  {/* <div>
                    <h3 className="font-semibold mb-1">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div> */}
                  {/* <div>
                    <h3 className="font-semibold mb-1">Creative Pursuits</h3>
                    <div className="flex flex-wrap gap-1">
                      {member.creativePursuits.map((pursuit, index) => (
                        <Badge key={index} variant="default">{pursuit}</Badge>
                      ))}
                    </div>
                  </div> */}
                  {/* <div>
                    <h3 className="font-semibold mb-1">Group Fitness Activities</h3>
                    <div className="flex flex-wrap gap-1">
                      {member.groupFitnessActivities.map((activity, index) => (
                        <Badge key={index} variant="secondary">{activity}</Badge>
                      ))}
                    </div>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

