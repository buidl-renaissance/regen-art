CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ticket_types (
  id VARCHAR(255) PRIMARY KEY,
  event_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  available INTEGER NOT NULL DEFAULT 0,
  sold INTEGER NOT NULL DEFAULT 0,
  reserved INTEGER NOT NULL DEFAULT 0,
  remaining INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, id),
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE checkout_sessions (
  session_id VARCHAR(255) PRIMARY KEY,
  event_id INTEGER NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE cart_items (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  checkout_session_id VARCHAR(255) NOT NULL,
  ticket_type_id VARCHAR(255) NOT NULL,
  event_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (checkout_session_id) REFERENCES checkout_sessions(session_id) ON DELETE CASCADE,
  FOREIGN KEY (ticket_type_id) REFERENCES ticket_types(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE purchased_tickets (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  event_id INTEGER NOT NULL,
  ticket_type_id VARCHAR(255) NOT NULL,
  handle VARCHAR(255),
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('valid', 'redeemed', 'refunded', 'cancelled') DEFAULT 'valid',
  checkout_session_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (ticket_type_id) REFERENCES ticket_types(id) ON DELETE CASCADE,
  FOREIGN KEY (checkout_session_id) REFERENCES checkout_sessions(session_id) ON DELETE CASCADE
);


-- Insert sample events
INSERT INTO events (id, title, date, location, description) VALUES
(1, 'Arts for the Earth Exhibition', '2023-06-15T19:00:00', 'Main Gallery', 'A showcase of environmental art from around the world.'),
(2, 'Modern Expressions Workshop', '2023-07-22T14:00:00', 'Studio B', 'Learn contemporary art techniques from master artists.'),
(3, 'Annual Photography Showcase', '2023-08-10T18:30:00', 'East Wing Gallery', 'Featuring the best photography from emerging artists.');

-- Insert sample ticket types
INSERT INTO ticket_types (id, event_id, name, price, description, available, sold, reserved, remaining) VALUES
('general-event-1', 1, 'General Admission', 25.00, 'Standard entry to the exhibition', 100, 0, 0, 100),
('vip-event-1', 1, 'VIP Experience', 75.00, 'Includes private tour and complimentary drinks', 20, 0, 0, 20),
('workshop-event-1', 1, 'Artist Workshop', 50.00, 'Hands-on workshop with featured artists', 15, 0, 0, 15),
('general-event-2', 2, 'Workshop Pass', 40.00, 'Full day access to the workshop', 30, 0, 0, 30),
('premium-event-2', 2, 'Premium Workshop Pass', 65.00, 'Includes materials and take-home art kit', 15, 0, 0, 15),
('general-event-3', 3, 'Gallery Admission', 20.00, 'Standard entry to the photography showcase', 80, 0, 0, 80),
('student-event-3', 3, 'Student Admission', 12.00, 'Discounted entry for students with valid ID', 50, 0, 0, 50);
