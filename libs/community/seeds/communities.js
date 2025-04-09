// Import mock data
const { mockCommunities, mockCommunityMembers } = require('../src/lib/mock');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  // Convert mock data to database format
  const communities = mockCommunities.map(community => ({
    id: community.id,
    name: community.name,
    description: community.description,
    slug: community.slug,
    image_url: community.imageUrl,
    banner_url: community.bannerUrl,
    location: community.location,
    website: community.website,
    status: community.status.toLowerCase(),
    created_at: community.createdAt,
    updated_at: community.updatedAt,
    member_count: community.memberCount || 0,
    tags: JSON.stringify(community.tags || [])
  }));
  
  const communityMembers = mockCommunityMembers.map(member => ({
    id: member.id,
    user_id: member.userId,
    community_id: member.communityId,
    role: member.role.toLowerCase(),
    joined_at: member.joinedAt,
    display_name: member.displayName,
    bio: member.bio,
    profile_image_url: member.profileImageUrl
  }));
  
  // Delete existing entries
  await knex('community_projects').del();
  await knex('community_events').del();
  await knex('community_members').del();
  await knex('communities').del();
  
  // Insert communities
  await knex('communities').insert(communities);
  
  // Insert community members
  await knex('community_members').insert(communityMembers);
};
