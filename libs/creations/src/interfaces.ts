export enum CreationStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

export enum CreationType {
  ARTWORK = 'artwork',
  EVENT = 'event',
  PROJECT = 'project',
  WORKSHOP = 'workshop',
  INSTALLATION = 'installation',
  PERFORMANCE = 'performance',
  EXHIBITION = 'exhibition',
  // DIGITAL_MEDIA = 'digital_media',
  // MUSIC = 'music',
}

export interface Creator {
  handle: string;
  name?: string;
  profileImage?: string;
  bio?: string;
  websiteUrl?: string;
}

export interface Creation {
  id: string;
  title: string;
  description: string;
  slug?: string;
  imageUrl?: string;
  category: string;
  tags?: string[];
  status: CreationStatus;
  type?: CreationType;
  location?: string;
  creator?: Creator;
  url?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project extends Creation {
  startDate?: string;
  endDate?: string;
}

export interface Artwork extends Project {
  artist?: string;
  medium?: string;
  dimensions?: string;
  collaborators?: string[];
}

export interface Venue {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  geo?: {
    lat: number;
    lng: number;
  };
}

export interface Event extends Project {
  startDatetime: string;
  endDatetime?: string;
  venue?: Venue;
}

export interface Installation extends Project {
  venue?: Venue;
  hours?: any;
  events?: Event[];
  participants?: string[];
}

export interface Performance extends Project {
  performers?: string[];
  venue?: Venue;
  events?: Event[];
  participants?: string[];
}

export interface Exhibition extends Project {
  venue?: Venue;
  hours?: any;
  events?: Event[];
  participants?: string[];
}

type WorkshopExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Workshop extends Project {
  venue?: Venue;
  hours?: any;
  events?: Event[];
  cost?: number;
  materials?: string[];
  registration?: string;
  capacity?: number;
  ageRange?: string;
  level?: WorkshopExperienceLevel;
}


