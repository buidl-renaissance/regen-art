/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries in reverse order to avoid foreign key constraints
  await knex('forum_thread_tags').del();
  await knex('forum_tags').del();
  await knex('forum_posts').del();
  await knex('forum_threads').del();
  await knex('forum_categories').del();

  // Insert categories
  const categories = await knex('forum_categories').insert([
    { name: 'General Discussion', slug: 'general-discussion', description: 'General topics related to BUIDL Detroit', display_order: 1 },
    { name: 'Project Collaboration', slug: 'project-collaboration', description: 'Find collaborators and discuss ongoing projects', display_order: 2 },
    { name: 'Technical Discussion', slug: 'technical-discussion', description: 'Discuss technical topics, frameworks, and tools', display_order: 3 },
    { name: 'Introductions', slug: 'introductions', description: 'Introduce yourself to the community', display_order: 4 },
    { name: 'Events & Meetups', slug: 'events-meetups', description: 'Upcoming events and meetups in Detroit', display_order: 5 },
    { name: 'Jobs & Opportunities', slug: 'jobs-opportunities', description: 'Job postings and opportunities in Detroit tech', display_order: 6 }
  ]).returning('id');

  // Insert tags
  const tags = await knex('forum_tags').insert([
    { name: 'React', slug: 'react' },
    { name: 'JavaScript', slug: 'javascript' },
    { name: 'Web3', slug: 'web3' },
    { name: 'Blockchain', slug: 'blockchain' },
    { name: 'Design', slug: 'design' },
    { name: 'Backend', slug: 'backend' },
    { name: 'Frontend', slug: 'frontend' },
    { name: 'Detroit', slug: 'detroit' },
    { name: 'Community', slug: 'community' },
    { name: 'Beginner', slug: 'beginner' }
  ]).returning('id');

  // Insert threads
  const threads = await knex('forum_threads').insert([
    { 
      title: 'Building a Community Events API', 
      slug: 'building-community-events-api', 
      category_id: categories[1].id, 
      handle: 'dArt',
      views: 87,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    { 
      title: 'React vs. Svelte for Community Projects', 
      slug: 'react-vs-svelte-community-projects', 
      category_id: categories[2].id, 
      handle: 'dArt',
      views: 156,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    { 
      title: 'Introducing Myself: Frontend Dev from Eastern Market', 
      slug: 'introducing-myself-frontend-dev-eastern-market', 
      category_id: categories[3].id, 
      handle: 'dArt',
      views: 42,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    { 
      title: 'Detroit Tech Meetup - May 2025', 
      slug: 'detroit-tech-meetup-may-2025', 
      category_id: categories[4].id, 
      handle: 'dArt', 
      is_pinned: true,
      views: 120,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    { 
      title: 'Senior React Developer Needed for Downtown Startup', 
      slug: 'senior-react-developer-downtown-startup', 
      category_id: categories[5].id, 
      handle: 'dArt', 
      views: 210,
      created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
    }
  ]).returning('id');

  // Insert posts
  await knex('forum_posts').insert([
    { 
      thread_id: threads[0].id, 
      handle: 'dArt', 
      content: "<p>I'm working on an API to aggregate community events across Detroit. Looking for feedback on the data model. I'm thinking of using a NoSQL database to store event data with the following structure:</p><pre><code>{\n  \"id\": \"unique-id\",\n  \"title\": \"Event Title\",\n  \"description\": \"Event description\",\n  \"location\": {\n    \"name\": \"Venue Name\",\n    \"address\": \"123 Main St\",\n    \"city\": \"Detroit\",\n    \"state\": \"MI\",\n    \"zip\": \"48201\",\n    \"coordinates\": {\n      \"lat\": 42.3314,\n      \"lng\": -83.0458\n    }\n  },\n  \"startDate\": \"2025-05-15T18:00:00\",\n  \"endDate\": \"2025-05-15T21:00:00\",\n  \"organizer\": {\n    \"id\": \"organizer-id\",\n    \"name\": \"Organizer Name\"\n  },\n  \"tags\": [\"tech\", \"networking\", \"detroit\"]\n}</code></pre><p>What do you think? Am I missing any important fields?</p>",
      is_first_post: true,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    { 
      thread_id: threads[0].id, 
      handle: 'dArt', 
      content: "<p>This looks great! You might want to consider adding fields for:</p><ul><li>Event capacity/max attendees</li><li>Registration/ticket URL</li><li>Event status (scheduled, canceled, postponed)</li><li>Accessibility information</li><li>Virtual attendance options</li></ul><p>Also, have you considered how you'll handle recurring events?</p>",
      created_at: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
    },
    { 
      thread_id: threads[1].id,
      handle: 'dArt', 
      content: "<p>What are people's thoughts on using Svelte instead of React for new community projects? I've been experimenting with Svelte recently and I'm impressed by its simplicity and performance. The compiler-based approach seems to result in smaller bundle sizes and better runtime performance.</p><p>However, React has a much larger ecosystem and more developers are familiar with it. For community projects where we want to maximize participation, is it better to stick with React or is it worth pushing for newer technologies like Svelte?</p>",
      is_first_post: true,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    { 
      thread_id: threads[1].id, 
      handle: 'dArt', 
      content: "<p>I've used both and I think it depends on the project goals. React is definitely more battle-tested and has a larger community, which makes it easier to find solutions to problems and hire developers.</p><p>Svelte is great for smaller projects where performance is critical. The developer experience is excellent, but you might run into situations where there isn't a ready-made library for what you need.</p><p>For community projects, I'd lean toward React simply because more people can contribute without a learning curve. But maybe we could have a small Svelte project as an experiment?</p>",
      created_at: new Date(Date.now() - 20 * 60 * 60 * 1000) // 20 hours ago
    },
    { 
      thread_id: threads[2].id, 
      handle: 'dArt', 
      content: "<p>Hey everyone! I'm a frontend developer based in Eastern Market. I specialize in React and have been working on web applications for about 3 years now. Recently moved to Detroit from Chicago and looking to connect with the local tech community.</p><p>I'm particularly interested in projects related to urban development, community resources, and anything that helps make city information more accessible. If anyone is working on something in that space, I'd love to contribute!</p><p>Looking forward to meeting you all at upcoming events!</p>",
      is_first_post: true,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    }
  ]);

  // Insert thread_tags relationships
  await knex('forum_thread_tags').insert([
    { thread_id: threads[0].id, tag_id: tags[7].id }, // Detroit
    { thread_id: threads[0].id, tag_id: tags[8].id }, // Community
    { thread_id: threads[0].id, tag_id: tags[5].id }, // Backend
    
    { thread_id: threads[1].id, tag_id: tags[0].id }, // React
    { thread_id: threads[1].id, tag_id: tags[1].id }, // JavaScript
    { thread_id: threads[1].id, tag_id: tags[6].id }, // Frontend
    
    { thread_id: threads[2].id, tag_id: tags[0].id }, // React
    { thread_id: threads[2].id, tag_id: tags[6].id }, // Frontend
    { thread_id: threads[2].id, tag_id: tags[7].id }, // Detroit
    
    { thread_id: threads[3].id, tag_id: tags[7].id }, // Detroit
    { thread_id: threads[3].id, tag_id: tags[8].id }, // Community
    
    { thread_id: threads[4].id, tag_id: tags[0].id }, // React
    { thread_id: threads[4].id, tag_id: tags[7].id } // Detroit
  ]);
};


  // // Insert categories
  // const categories = await db.raw(`
  //   INSERT INTO forum_categories (name, slug, description, "order")
  //   VALUES 
  //     ('General Discussion', 'general-discussion', 'General topics related to BUIDL Detroit', 1),
  //     ('Project Collaboration', 'project-collaboration', 'Find collaborators and discuss ongoing projects', 2),
  //     ('Technical Discussion', 'technical-discussion', 'Discuss technical topics, frameworks, and tools', 3),
  //     ('Introductions', 'introductions', 'Introduce yourself to the community', 4),
  //     ('Events & Meetups', 'events-meetups', 'Upcoming events and meetups in Detroit', 5),
  //     ('Jobs & Opportunities', 'jobs-opportunities', 'Job postings and opportunities in Detroit tech', 6)
  //   RETURNING id
  // `);
