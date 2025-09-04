-- The database todoDb is automatically created by Docker environment variables

GRANT ALL PRIVILEGES ON *.* TO 'todoUser'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

use todoDb;

CREATE TABLE IF NOT EXISTS todo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);
