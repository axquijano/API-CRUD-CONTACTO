CREATE DATABASE contactdb;
 
\c contactdb

CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Users (username, email, password) VALUES
('axquijano', 'axquijano@gmail.com', '1233');
CREATE TABLE Contact(
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    address VARCHAR(255),
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Contact (first_name, last_name, email, address, user_id) 
VALUES 
('Michel', 'Gutierrez', 'magutierrez@gmail.com', 'Calle 2A # 20 - 00, Pandiguando', 1);
INSERT INTO Contact (first_name, last_name, email, address, user_id) 
VALUES 
('Mannuel', 'Granoble', 'mfgranoble@gmail.com', 'Carrera 18 bn Esmeralda',1);

CREATE TABLE Phone  (
    id SERIAL PRIMARY KEY,
    contact_id  INT REFERENCES Contact(id) ON DELETE CASCADE,
    type  VARCHAR(25), --Ej: movil, fijo
    phone_number  VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Phone   (contact_id, type, phone_number)
VALUES
(1, 'movil', '3104411267');
INSERT INTO Phone   (contact_id, type, phone_number)
VALUES
(1, 'fijo', '82333456');
INSERT INTO Phone   (contact_id, type, phone_number)
VALUES
(2, 'movil', '3127242012');