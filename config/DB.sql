-- Create User table
CREATE TABLE Users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,                     -- Primærnøkkel
    name VARCHAR(255) NOT NULL,                -- Navn på brukeren
    email VARCHAR(255) UNIQUE NOT NULL,        -- Unik e-post
    password VARCHAR(255) NOT NULL,            -- Hashet passord
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'sales', 'support')), -- Rolle
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Når brukeren ble opprettet
);

-- Create Customer table
CREATE TABLE Customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,                     -- Primærnøkkel
    name VARCHAR(255) NOT NULL,                -- Fullt navn på kunden
    email VARCHAR(255) NOT NULL,               -- Kundens e-post
    company VARCHAR(255),                       -- Firmanavn (hvis relevant)
    phone VARCHAR(50),                         -- Telefonnummer
    status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'inactive', 'lead')), -- Status
    assignedTo INT UNSIGNED,                        -- Hvilken bruker som eier den
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Når kunden ble opprettet
    FOREIGN KEY (assignedTo) REFERENCES Users(id) ON DELETE SET NULL -- Foreign key til Users
);

-- Create Activity table
CREATE TABLE Activities (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,                     -- Primærnøkkel
    type VARCHAR(50) NOT NULL CHECK (type IN ('call', 'meeting', 'email')), -- Type aktivitet
    note TEXT NOT NULL,                        -- Hva ble gjort?
    date TIMESTAMP NOT NULL,                   -- Når aktiviteten skjedde
    customerId INT UNSIGNED NOT NULL,               -- Hvilken kunde aktiviteten gjelder
    userId INT UNSIGNED NOT NULL,                   -- Hvem utførte aktiviteten
    FOREIGN KEY (customerId) REFERENCES Customers(id) ON DELETE CASCADE, -- Foreign key til Customers
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE -- Foreign key til Users
);

INSERT INTO Users(name, email, password, role, createdAt)
VALUES ('John Doe', 'mail@gmail.com', 'password', 'admin', CURRENT_TIMESTAMP);

INSERT INTO Users(name, email, password, role, createdAt)
VALUES ('Jane Smith', 'me@gmail.com', 'password123', 'sales', CURRENT_TIMESTAMP);

INSERT INTO Activities(type, note, date, customerId, userId)
VALUES ('call', 'Followed up on the lead', CURRENT_TIMESTAMP, 1, 1);

INSERT INTO Customers(name, email, company, phone, status, assignedTo, createdAt)
VALUES ('Acme Inc', 'contact@acme.com', 'Acme Inc', '555-1234', 'active', NULL, CURRENT_TIMESTAMP);