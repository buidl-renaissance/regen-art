import { Community, CommunityStatus, CommunityRole, CommunityMember, CommunityEvent, CommunityProject } from './interface';

export const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Detroit Artists Collective',
    description: 'A community of visual artists collaborating on exhibitions and public art projects throughout Detroit.',
    slug: 'detroit-artists-collective',
    imageUrl: '/images/communities/artists-collective.jpg',
    bannerUrl: '/images/banners/artists-collective-banner.jpg',
    location: 'Eastern Market',
    website: 'https://detroitartistscollective.org',
    status: CommunityStatus.ACTIVE,
    createdAt: new Date('2022-03-15'),
    updatedAt: new Date('2023-01-10'),
    memberCount: 87,
    tags: ['visual arts', 'exhibitions', 'public art', 'collaboration']
  },
  {
    id: '2',
    name: 'Tech Detroit',
    description: 'Building Detroit\'s tech ecosystem through education, networking, and collaborative projects.',
    slug: 'tech-detroit',
    imageUrl: '/images/communities/tech-detroit.jpg',
    bannerUrl: '/images/banners/tech-detroit-banner.jpg',
    location: 'Midtown',
    website: 'https://techdetroit.org',
    status: CommunityStatus.ACTIVE,
    createdAt: new Date('2021-11-05'),
    updatedAt: new Date('2023-02-22'),
    memberCount: 156,
    tags: ['technology', 'education', 'networking', 'startups']
  },
  {
    id: '3',
    name: 'Detroit Urban Farmers',
    description: 'Growing community through urban agriculture, sustainability education, and food justice initiatives.',
    slug: 'detroit-urban-farmers',
    imageUrl: '/images/communities/urban-farmers.jpg',
    bannerUrl: '/images/banners/urban-farmers-banner.jpg',
    location: 'North End',
    status: CommunityStatus.ACTIVE,
    createdAt: new Date('2020-04-22'),
    updatedAt: new Date('2023-03-01'),
    memberCount: 112,
    tags: ['urban agriculture', 'sustainability', 'food justice', 'education']
  },
  {
    id: '4',
    name: 'Detroit Music Alliance',
    description: 'Supporting local musicians through performance opportunities, education, and industry connections.',
    slug: 'detroit-music-alliance',
    imageUrl: '/images/communities/music-alliance.jpg',
    bannerUrl: '/images/banners/music-alliance-banner.jpg',
    location: 'Corktown',
    website: 'https://detroitmusicalliance.com',
    status: CommunityStatus.ACTIVE,
    createdAt: new Date('2021-08-17'),
    updatedAt: new Date('2023-01-30'),
    memberCount: 203,
    tags: ['music', 'performance', 'education', 'industry']
  },
  {
    id: '5',
    name: 'Detroit Filmmakers Collective',
    description: 'Collaborative community for independent filmmakers, providing resources, networking, and screening opportunities.',
    slug: 'detroit-filmmakers-collective',
    imageUrl: '/images/communities/filmmakers.jpg',
    bannerUrl: '/images/banners/filmmakers-banner.jpg',
    location: 'Midtown',
    website: 'https://detroitfilmmakerscollective.org',
    status: CommunityStatus.ACTIVE,
    createdAt: new Date('2022-01-10'),
    updatedAt: new Date('2023-02-15'),
    memberCount: 68,
    tags: ['film', 'independent cinema', 'production', 'screenings']
  }
];

export const mockCommunityMembers: CommunityMember[] = [
  {
    id: '101',
    userId: 'u1',
    communityId: '1',
    role: CommunityRole.ADMIN,
    joinedAt: new Date('2022-03-15'),
    displayName: 'Maria Johnson',
    bio: 'Visual artist specializing in large-scale murals and community art projects.',
    profileImageUrl: '/images/profiles/maria-johnson.jpg'
  },
  {
    id: '102',
    userId: 'u2',
    communityId: '1',
    role: CommunityRole.MEMBER,
    joinedAt: new Date('2022-04-10'),
    displayName: 'James Wilson',
    bio: 'Photographer documenting Detroit\'s architectural renaissance.',
    profileImageUrl: '/images/profiles/james-wilson.jpg'
  },
  {
    id: '201',
    userId: 'u3',
    communityId: '2',
    role: CommunityRole.ADMIN,
    joinedAt: new Date('2021-11-05'),
    displayName: 'Aisha Rahman',
    bio: 'Software engineer and community organizer passionate about tech education.',
    profileImageUrl: '/images/profiles/aisha-rahman.jpg'
  },
  {
    id: '301',
    userId: 'u4',
    communityId: '3',
    role: CommunityRole.MODERATOR,
    joinedAt: new Date('2020-04-22'),
    displayName: 'Miguel Sanchez',
    bio: 'Urban farmer and educator with 10+ years experience in community gardens.',
    profileImageUrl: '/images/profiles/miguel-sanchez.jpg'
  }
];

export const mockCommunityEvents: CommunityEvent[] = [
  {
    id: 'e101',
    communityId: '1',
    title: 'Eastern Market Mural Exhibition',
    description: 'A showcase of new murals created by Detroit Artists Collective members throughout Eastern Market.',
    startDate: new Date('2023-06-15T14:00:00'),
    endDate: new Date('2023-06-15T20:00:00'),
    location: 'Eastern Market, Detroit',
    imageUrl: '/images/events/mural-exhibition.jpg',
    status: 'upcoming',
    createdBy: '101',
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-04-10'),
    maxAttendees: 200,
    currentAttendees: 87
  },
  {
    id: 'e201',
    communityId: '2',
    title: 'Detroit Tech Summit',
    description: 'Annual gathering of Detroit\'s tech community featuring workshops, networking, and demos from local startups.',
    startDate: new Date('2023-07-22T09:00:00'),
    endDate: new Date('2023-07-23T17:00:00'),
    location: 'TechTown Detroit',
    imageUrl: '/images/events/tech-summit.jpg',
    status: 'upcoming',
    createdBy: '201',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-04-01'),
    maxAttendees: 500,
    currentAttendees: 312
  },
  {
    id: 'e301',
    communityId: '3',
    title: 'Spring Planting Workshop',
    description: 'Hands-on workshop teaching urban gardening techniques for spring vegetable planting.',
    startDate: new Date('2023-05-08T10:00:00'),
    endDate: new Date('2023-05-08T13:00:00'),
    location: 'North End Community Garden',
    imageUrl: '/images/events/planting-workshop.jpg',
    status: 'completed',
    createdBy: '301',
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-03-20'),
    maxAttendees: 30,
    currentAttendees: 28
  }
];

export const mockCommunityProjects: CommunityProject[] = [
  {
    id: 'p101',
    communityId: '1',
    title: 'Neighborhood Beautification Initiative',
    description: 'Collaborative project to create murals on vacant buildings in partnership with neighborhood associations.',
    imageUrl: '/images/projects/beautification.jpg',
    status: 'active',
    createdBy: '101',
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-03-10'),
    tags: ['murals', 'neighborhood', 'beautification', 'collaboration']
  },
  {
    id: 'p201',
    communityId: '2',
    title: 'Youth Coding Program',
    description: 'After-school program teaching coding skills to middle and high school students in underserved neighborhoods.',
    imageUrl: '/images/projects/youth-coding.jpg',
    status: 'active',
    createdBy: '201',
    createdAt: new Date('2022-09-01'),
    updatedAt: new Date('2023-01-15'),
    tags: ['education', 'coding', 'youth', 'mentorship']
  },
  {
    id: 'p301',
    communityId: '3',
    title: 'Community Composting Network',
    description: 'Building a network of community composting sites throughout Detroit neighborhoods to reduce waste and create soil for urban gardens.',
    imageUrl: '/images/projects/composting.jpg',
    status: 'active',
    createdBy: '301',
    createdAt: new Date('2022-11-10'),
    updatedAt: new Date('2023-02-28'),
    tags: ['composting', 'sustainability', 'waste reduction', 'urban gardening']
  }
];
