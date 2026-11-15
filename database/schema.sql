CREATE DATABASE IF NOT EXISTS student_stay CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE student_stay;
CREATE TABLE users (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 email VARCHAR(190) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL,
 phone VARCHAR(25) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE properties (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(150) NOT NULL,
 city VARCHAR(100) NOT NULL,
 address VARCHAR(255) NOT NULL,
 price DECIMAL(10,2) NOT NULL,
 gender ENUM('Male','Female','Unisex') NOT NULL,
 rating DECIMAL(2,1) NOT NULL DEFAULT 0,
 description TEXT NOT NULL,
 INDEX filter_city_price (city,price)
) ENGINE=InnoDB;
CREATE TABLE amenities (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;
CREATE TABLE property_amenities (
 property_id INT UNSIGNED NOT NULL,
 amenity_id INT UNSIGNED NOT NULL,
 PRIMARY KEY(property_id,amenity_id),
 FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
 FOREIGN KEY(amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
) ENGINE=InnoDB;
CREATE TABLE interested_users (
 user_id INT UNSIGNED NOT NULL,
 property_id INT UNSIGNED NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY(user_id,property_id),
 FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
 FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE
) ENGINE=InnoDB;
CREATE TABLE property_images (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 property_id INT UNSIGNED NOT NULL,
 path VARCHAR(255) NOT NULL,
 alt_text VARCHAR(200) NOT NULL,
 sort_order INT NOT NULL DEFAULT 0,
 FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE,
 INDEX image_order(property_id,sort_order,id)
) ENGINE=InnoDB;
INSERT INTO properties (name,city,address,price,gender,rating,description) VALUES
('Maple Student House','Delhi','Demo address: North Campus',8500,'Male',4.4,'A sample student residence with study areas and shared rooms. All listings and ratings are fictional demonstration data.'),
('Willow Girls Residence','Delhi','Demo address: South Campus',10500,'Female',4.7,'A sample residence with furnished rooms, meals and a shared lounge.'),
('Campus Nest','Bengaluru','Demo address: Koramangala',12500,'Unisex',4.5,'A sample student residence with Wi-Fi, a study space and laundry facilities.'),
('Bluebird PG','Pune','Demo address: Viman Nagar',7000,'Male',4.1,'A sample budget-friendly shared accommodation near a college district.'),
('Rosewood Stay','Pune','Demo address: Kothrud',9500,'Female',4.6,'A sample residence with furnished rooms and housekeeping.'),
('Urban Scholar','Bengaluru','Demo address: Whitefield',11000,'Unisex',4.3,'A sample accommodation with shared kitchen and common study area.');
INSERT INTO amenities(name) VALUES ('Wi-Fi'),('Meals'),('Laundry'),('Study area'),('Housekeeping'),('Shared kitchen');
INSERT INTO property_amenities VALUES (1,1),(1,2),(1,4),(2,1),(2,2),(2,5),(3,1),(3,3),(3,4),(4,1),(4,6),(5,1),(5,2),(5,5),(6,1),(6,4),(6,6);
INSERT INTO property_images(property_id,path,alt_text,sort_order)
SELECT id,'images/room.svg','Illustration of a sample bedroom',0 FROM properties;
INSERT INTO property_images(property_id,path,alt_text,sort_order)
SELECT id,'images/lounge.svg','Illustration of a sample common area',1 FROM properties;
