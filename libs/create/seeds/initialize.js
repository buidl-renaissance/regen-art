/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Clear all tables in reverse order of dependencies
  await knex('workshop_events').del();
  await knex('exhibition_events').del();
  await knex('performance_events').del();
  await knex('installation_events').del();
  await knex('workshops').del();
  await knex('exhibitions').del();
  await knex('performances').del();
  await knex('installations').del();
  await knex('events').del();
  await knex('venues').del();
  await knex('artworks').del();
  await knex('projects').del();
  await knex('creations').del();
  await knex('creators').del();

  // Seed creators
  const creators = [
    {
      handle: 'johndoe',
      name: 'John Doe',
      image: 'https://example.com/johndoe.jpg',
      bio: 'Contemporary artist working with mixed media',
      websiteUrl: 'https://johndoe.com',
      social: JSON.stringify({
        instagram: '@johndoe',
        twitter: '@johndoe_art'
      })
    },
    {
      handle: 'janesmith',
      name: 'Jane Smith',
      image: 'https://example.com/janesmith.jpg',
      bio: 'Sculptor and installation artist',
      websiteUrl: 'https://janesmith.art',
      social: JSON.stringify({
        instagram: '@janesmith_art',
        facebook: 'janesculpture'
      })
    }
  ];
  
  await knex('creators').insert(creators);

  // Seed venues
  const venues = [
    {
      name: 'Downtown Gallery',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      geo: JSON.stringify({ lat: 40.7128, lng: -74.0060 })
    },
    {
      name: 'Community Arts Center',
      address: '456 Park Ave',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      geo: JSON.stringify({ lat: 41.8781, lng: -87.6298 })
    }
  ];
  
  const venueIds = await knex('venues').insert(venues).returning('id');

  // Seed creations and projects
  const creations = [
    {
      title: 'Abstract Reflections',
      description: 'A series of paintings exploring light and shadow',
      slug: 'abstract-reflections',
      imageUrl: 'https://example.com/abstract.jpg',
      category: 'visual',
      tags: JSON.stringify(['painting', 'abstract', 'contemporary']),
      status: 'active',
      type: 'artwork',
      creator_handle: 'johndoe'
    },
    {
      title: 'Sculpture Workshop',
      description: 'Learn the basics of clay sculpture',
      slug: 'sculpture-workshop',
      imageUrl: 'https://example.com/workshop.jpg',
      category: 'education',
      tags: JSON.stringify(['workshop', 'sculpture', 'beginners']),
      status: 'active',
      type: 'workshop',
      creator_handle: 'janesmith'
    },
    {
      title: 'Urban Perspectives',
      description: 'A photography exhibition exploring city life',
      slug: 'urban-perspectives',
      imageUrl: 'https://example.com/urban.jpg',
      category: 'visual',
      tags: JSON.stringify(['photography', 'urban', 'exhibition']),
      status: 'active',
      type: 'exhibition',
      creator_handle: 'johndoe'
    }
  ];
  
  const creationIds = await knex('creations').insert(creations).returning('id');
  
  // Seed projects
  const projects = creationIds.map(({ id }, index) => ({
    id,
    startDate: new Date(2023, 5, 15),
    endDate: index === 1 ? new Date(2023, 5, 16) : new Date(2023, 6, 15)
  }));
  
  await knex('projects').insert(projects);
  
  // Seed artwork
  await knex('artworks').insert({
    id: creationIds[0].id,
    artist: 'John Doe',
    medium: 'Oil on canvas',
    dimensions: '24" x 36"',
    collaborators: JSON.stringify(['Jane Smith'])
  });
  
  // Seed workshop
  await knex('workshops').insert({
    id: creationIds[1].id,
    venue_id: venueIds[1].id,
    hours: JSON.stringify({ mon: '9-5', wed: '9-5', fri: '9-5' }),
    cost: 75.00,
    materials: JSON.stringify(['clay', 'sculpting tools', 'apron']),
    registration: 'https://example.com/register',
    capacity: 15,
    ageRange: '16+',
    level: 'beginner'
  });
  
  // Seed exhibition
  await knex('exhibitions').insert({
    id: creationIds[2].id,
    venue_id: venueIds[0].id,
    hours: JSON.stringify({ tue: '10-6', wed: '10-6', thu: '10-6', fri: '10-8', sat: '12-5', sun: '12-5' }),
    participants: JSON.stringify(['John Doe', 'Jane Smith', 'Other Artists'])
  });
  
  // Seed events
  const events = [
    {
      id: creationIds.length + 1,
      startDatetime: new Date(2023, 5, 15, 18, 0), // Opening reception
      endDatetime: new Date(2023, 5, 15, 21, 0),
      venue_id: venueIds[0].id
    },
    {
      id: creationIds.length + 2,
      startDatetime: new Date(2023, 5, 16, 10, 0), // Workshop session
      endDatetime: new Date(2023, 5, 16, 16, 0),
      venue_id: venueIds[1].id
    }
  ];
  
  const eventIds = await knex('events').insert(events).returning('id');
  
  // Link events to their respective projects
  await knex('exhibition_events').insert({
    exhibition_id: creationIds[2].id,
    event_id: eventIds[0].id
  });
  
  await knex('workshop_events').insert({
    workshop_id: creationIds[1].id,
    event_id: eventIds[1].id
  });
};
