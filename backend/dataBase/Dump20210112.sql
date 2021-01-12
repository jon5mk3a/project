-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: project
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apartment`
--

DROP TABLE IF EXISTS `apartment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartment` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `photo` varchar(500) NOT NULL,
  `location` varchar(100) NOT NULL,
  `rooms` int NOT NULL,
  `bathroom` int NOT NULL,
  `lift` tinyint(1) DEFAULT '0',
  `balcony` tinyint(1) DEFAULT '0',
  `heating` tinyint(1) DEFAULT '0',
  `furniture` tinyint(1) DEFAULT '0',
  `internet` tinyint(1) DEFAULT '0',
  `tv` tinyint(1) DEFAULT '0',
  `price` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment`
--

LOCK TABLES `apartment` WRITE;
/*!40000 ALTER TABLE `apartment` DISABLE KEYS */;
INSERT INTO `apartment` VALUES (1,'http://localhost:8080/static/raffles.jpg','A Coruña',5,5,1,0,1,1,0,1,750.00),(2,'https://i.imgur.com/7gn6uxi.jpg','Lugo',5,5,0,1,1,1,0,1,500.00),(3,'https://i.imgur.com/7gn6uxi.jpg','Orense',3,2,0,0,1,1,0,1,300.00),(4,'https://i.imgur.com/7gn6uxi.jpg','Pontevedra',3,2,1,0,1,1,1,1,600.00),(5,'https://i.imgur.com/7gn6uxi.jpg','Santiago de Compostela',3,2,0,0,1,1,0,1,800.00),(6,'https://i.imgur.com/7gn6uxi.jpg','Donostia, San Sebastián',3,2,1,1,1,1,1,1,1200.00);
/*!40000 ALTER TABLE `apartment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluate`
--

DROP TABLE IF EXISTS `evaluate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluate` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_user` bigint unsigned DEFAULT NULL,
  `id_user_eval` bigint unsigned DEFAULT NULL,
  `text` varchar(1000) DEFAULT NULL,
  `rating` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluate`
--

LOCK TABLES `evaluate` WRITE;
/*!40000 ALTER TABLE `evaluate` DISABLE KEYS */;
INSERT INTO `evaluate` VALUES (1,3,1,'este usuario es excelente!!!',4),(2,3,1,'este usuario es excelente!!!',4),(3,3,1,'este usuario es excelente!!!',4);
/*!40000 ALTER TABLE `evaluate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `photo` varchar(500) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `nick_name` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `information` varchar(1000) DEFAULT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nick_name` (`nick_name`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'aqui va mi foto','Andres','Sainz','mi direccion','jon','password de jon',NULL,'555555555',NULL),(3,'aquí va mi foto','Andres','Sainz','mi direccion','Andres','$2a$10$F3J.U27jpnMiTouuKrLJleP6hwezdifo3qdX34vrv5jIJUHlI37EK','aquí va la información personal de cada usuario','555555556','andres1@email.com'),(4,'aqui va mi foto','Jon','Ander','mi dirección','Jon5','$2a$10$H4fkLmFSY0KHF8Dr9bjbReIPxDlvkZk80EAl6cbpv2wz1/iu1bY4W',NULL,'5555555557','jon@mail.com'),(5,'C:\\fakepath\\conradintl.jpg','awdfsadg','dfgadsfgv','dvfsaadv','123456','$2a$10$QEbs5XsLuSU/Znb.RCrtcuAgwQ883UcRE/OS5fKbdXA0ptV6WIlMS','sdsdvsdvsdv','55555455','sdsdav@mail.com'),(6,'C:\\fakepath\\conradintl.jpg','awdfsadg2','dfgadsfgv2','dvfsaadv2','1234562','$2a$10$LAFqQ34PL2N/o3q4nzC7SOd0nKORZJW.jWlHfGaYF3jav3zBVABqy','sdsdvsdvsdv2','555554552','sdsdav2@mail.com'),(7,'C:\\fakepath\\swissotel.jpg','sdgdsg','fesdfsdf','dfsdfsdf','111111111','$2a$10$Duk2jY6cuZ.lbGligafNuuRCBxW/0TrlFmhjuRu241rjbR9PxRvSy','sdfddsfsdfdsaf','111111111','111111111@mail.com'),(8,'C:\\fakepath\\elephant.png','demo','demo','demo','demo','$2a$10$V1JW613khTiGkL.E3.YcLOgWFd6P4Iq0wG5BpYJi8slJBAWOVLmK6','demo','666666666','demo@mail.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_apartment_book`
--

DROP TABLE IF EXISTS `user_apartment_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_apartment_book` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_user` bigint unsigned DEFAULT NULL,
  `id_apartment` bigint unsigned DEFAULT NULL,
  `date` date DEFAULT NULL,
  `available` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_apartment` (`id_apartment`),
  CONSTRAINT `user_apartment_book_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `user_apartment_book_ibfk_2` FOREIGN KEY (`id_apartment`) REFERENCES `apartment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_apartment_book`
--

LOCK TABLES `user_apartment_book` WRITE;
/*!40000 ALTER TABLE `user_apartment_book` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_apartment_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_apartment_request`
--

DROP TABLE IF EXISTS `user_apartment_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_apartment_request` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_user` bigint unsigned DEFAULT NULL,
  `id_apartment` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_apartment` (`id_apartment`),
  CONSTRAINT `user_apartment_request_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `user_apartment_request_ibfk_2` FOREIGN KEY (`id_apartment`) REFERENCES `apartment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_apartment_request`
--

LOCK TABLES `user_apartment_request` WRITE;
/*!40000 ALTER TABLE `user_apartment_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_apartment_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_evaluate`
--

DROP TABLE IF EXISTS `user_user_evaluate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_user_evaluate` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `id_user` bigint unsigned DEFAULT NULL,
  `id_user_evaluate` bigint unsigned DEFAULT NULL,
  `text` varchar(1000) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_user_evaluate` (`id_user_evaluate`),
  CONSTRAINT `user_user_evaluate_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `user_user_evaluate_ibfk_2` FOREIGN KEY (`id_user_evaluate`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_evaluate`
--

LOCK TABLES `user_user_evaluate` WRITE;
/*!40000 ALTER TABLE `user_user_evaluate` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user_evaluate` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-12 17:13:15
