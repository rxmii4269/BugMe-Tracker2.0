CREATE DATABASE bugMe_Tracker;
USE bugMe_Tracker;
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users`
(
    `id` int(11) NOT NULL auto_increment,
    `firstname` char(35) NOT NULL,
    `lastname` char(35) NOT NULL,
    `password` VARCHAR(500) NOT NULL,
    `email` CHAR(35) NOT NULL,
    `date_joined` char(35) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

LOCK TABLES `Users` WRITE;

INSERT INTO `Users` VALUES (1,'Admin','Administrator',SHA2('password123',0),'admin@bugme.com',CURDATE());

UNLOCK TABLES;


DROP TABLE IF EXISTS `Issues`;
CREATE TABLE `Issues`
(
    `id` int(11) NOT NULL auto_increment,
    `title` char(35) NOT NULL default '',
    `description` char(255) NOT NULL default '',
    `type` char(35) NOT NULL,
    `priority` char(35) NOT NULL,
    `status` char(35) NOT NULL,
    `assigned_to` char(35) NOT NULL,
    `created_by` char(35) NOT NULL,
    `created` char(35) NOT NULL,
    `updated` char(35) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=UTF8MB4;
GRANT ALL PRIVILEGES ON bugMe_Tracker.* TO 'bugMe'@'localhost' IDENTIFIED BY 'iNFO@2180';