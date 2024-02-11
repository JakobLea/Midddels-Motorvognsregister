CREATE TABLE kunde
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    navn VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    persNr VARCHAR(20), -- or adjust the length as needed
    bilskilt VARCHAR(255) NOT NULL,
    bilMerke VARCHAR(255) NOT NULL,
    bilModell VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

