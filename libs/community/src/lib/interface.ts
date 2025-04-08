export enum CommunityRole {
  MEMBER = 'member',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  OWNER = 'owner'
}

export enum CommunityStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived'
}

export interface Community {
  id: string;
  name: string;
  description: string;
  slug: string;
  imageUrl?: string;
  bannerUrl?: string;
  location?: string;
  website?: string;
  status: CommunityStatus;
  createdAt: Date;
  updatedAt: Date;
  memberCount?: number;
  tags?: string[];
}

export interface CommunityMember {
  id: string;
  userId: string;
  communityId: string;
  role: CommunityRole;
  joinedAt: Date;
  displayName?: string;
  bio?: string;
  profileImageUrl?: string;
}

export interface CommunityEvent {
  id: string;
  communityId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  imageUrl?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  maxAttendees?: number;
  currentAttendees?: number;
}

export interface CommunityProject {
  id: string;
  communityId: string;
  title: string;
  description: string;
  imageUrl?: string;
  status: 'active' | 'completed' | 'on-hold';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}
