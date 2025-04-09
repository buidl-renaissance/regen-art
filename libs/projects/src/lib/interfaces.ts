export interface Project {
  id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  location?: string;
  contactEmail?: string;
  imageUrl?: string;
  websiteUrl?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  userId?: string;
  status?: ProjectStatus;
  members?: ProjectMember[];
  tags?: string[];
}

export enum ProjectStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ARCHIVED = 'archived'
}

export interface ProjectMember {
  id?: string;
  userId: string;
  projectId: string;
  role: ProjectMemberRole;
  joinedAt?: Date | string;
}

export enum ProjectMemberRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  CONTRIBUTOR = 'contributor',
  FOLLOWER = 'follower'
}

export interface ProjectPreferences {
  notifications: boolean;
  publicProject: boolean;
  allowJoinRequests: boolean;
  language: string;
}
