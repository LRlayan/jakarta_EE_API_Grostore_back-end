CREATE DATABASE groStore;

USE groStore;

CREATE TABLE customer(
                         id VARCHAR(50) PRIMARY KEY NOT NULL,
                         name VARCHAR(50) NOT NULL,
                         city VARCHAR(40) NOT NULL,
                         tel VARCHAR(15) NOT NULL
);

CREATE TABLE orders(
                       id VARCHAR(50) PRIMARY KEY NOT NULL,
                       date VARCHAR(20) NOT NULL,
                       customerId VARCHAR(50) NOT NULL,
                       CONSTRAINT FOREIGN KEY (customerId) REFERENCES customer(id) ON DELETE CASCADE ON UPDATE CASCADE,
                       discount DECIMAL(10,2) NOT NULL,
                       discountRate DECIMAL(10,2) NOT NULL,
                       subTotal DECIMAL(10,2) NOT NULL,
                       balance DECIMAL(10,2) NOT NULL
);

CREATE TABLE item(
                     itemCode VARCHAR(50) PRIMARY KEY NOT NULL,
                     itemName VARCHAR(50) NOT NULL,
                     QTYOnHand INT NOT NULL,
                     unitPrice DECIMAL(10,2) NOT NULL
);

CREATE TABLE orderDetail(
                            orderId VARCHAR(50) NOT NULL,
                            date VARCHAR(20) NOT NULL,
                            customerId VARCHAR(50) NOT NULL,
                            customerName VARCHAR(50) NOT NULL,
                            customerCity VARCHAR(40) NOT NULL,
                            customerTel VARCHAR(15) NOT NULL,
                            itemCode VARCHAR(50) NOT NULL,
                            itemName VARCHAR(50) NOT NULL,
                            orderQTY INT NOT NULL,
                            unitPrice DECIMAL(10,2) NOT NULL,
                            CONSTRAINT FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
                            CONSTRAINT FOREIGN KEY (itemCode) REFERENCES item(itemCode) ON DELETE CASCADE ON UPDATE CASCADE
);

-- delete all record in table
-- delete from table_name;