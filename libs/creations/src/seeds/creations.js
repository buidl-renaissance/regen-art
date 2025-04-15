/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('creations').del()
  await knex('creations').insert([
    {
      id: '1',
      title: 'Community Art Wall',
      description: 'A collaborative mural project bringing together local artists to transform blank walls into vibrant public art displays throughout Detroit neighborhoods.',
      image_url: '/images/projects/art-wall.jpg',
      data: JSON.stringify({
        category: 'Art & Culture',
        location: 'Eastern Market',
        url: 'https://communityartwall.org',
        status: 'active',
        tags: ['mural', 'community', 'public art'],
        slug: 'community-art-wall'
      }),
      creator: 'system'
    },
    {
      id: '2',
      title: 'Tech Mentorship Program',
      description: 'Connecting tech professionals with underserved youth to provide coding education, career guidance, and hands-on experience with technology projects.',
      image_url: '/images/projects/tech-mentorship.jpg',
      category: 'Technology',
      location: 'Midtown',
      status: 'active',
      slug: 'tech-mentorship-program',
      data: JSON.stringify({
        tags: ['education', 'coding', 'youth'],
      }),
      creator: 'system'
    },
    {
      id: '3',
      title: 'Urban Garden Initiative',
      description: 'Transforming vacant lots into productive community gardens that provide fresh produce and educational opportunities for neighborhood residents.',
      image_url: '/images/projects/urban-garden.jpg',
      status: 'active',
      category: 'Environment',
      location: 'North End',
      slug: 'urban-garden-initiative',
      data: JSON.stringify({
        url: 'https://detroitgrows.org',
        tags: ['gardening', 'sustainability', 'food'],
      }),
      creator: 'system'
    },
    {
      id: '4',
      title: 'Music Production Workshop',
      description: 'Weekly workshops teaching music production skills to aspiring artists, providing access to equipment and mentorship from industry professionals.',
      image_url: '/images/projects/music-workshop.jpg',
      status: 'active',
      category: 'Music',
      location: 'Corktown',
      slug: 'music-production-workshop',
      data: JSON.stringify({
        tags: ['music', 'production', 'education'],
      }),
      creator: 'system'
    }
  ]);
};
