-- Auth.js required tables
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  emailVerified INTEGER,
  image TEXT
);

CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  type TEXT,
  provider TEXT,
  providerAccountId TEXT,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Divination records (cloud storage)
CREATE TABLE IF NOT EXISTS divinations (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  question TEXT DEFAULT '',
  yaos TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS interpretations (
  id TEXT PRIMARY KEY,
  divinationId TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  language TEXT DEFAULT 'zh-CN',
  timestamp INTEGER NOT NULL,
  FOREIGN KEY (divinationId) REFERENCES divinations(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_divinations_userId ON divinations(userId);
CREATE INDEX IF NOT EXISTS idx_divinations_timestamp ON divinations(timestamp DESC);
