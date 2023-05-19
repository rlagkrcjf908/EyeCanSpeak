-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: k8d204.p.ssafy.io    Database: eyecan
-- ------------------------------------------------------
-- Server version	5.5.5-10.5.10-MariaDB-1:10.5.10+maria~bionic

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_no` int(11) NOT NULL AUTO_INCREMENT,
  `category_nm` varchar(255) NOT NULL,
  PRIMARY KEY (`category_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'쉬움'),(2,'보통'),(3,'어려움'),(4,'매우 어려움'),(5,'자유');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `draw`
--

DROP TABLE IF EXISTS `draw`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `draw` (
  `draw_no` int(11) NOT NULL AUTO_INCREMENT,
  `draw_create_date` datetime(6) DEFAULT NULL,
  `draw_drawing` varchar(255) NOT NULL,
  `draw_post_tf` bit(1) NOT NULL,
  `draw_recent_date` datetime(6) DEFAULT NULL,
  `category_no` int(11) DEFAULT NULL,
  `users_no` int(11) DEFAULT NULL,
  PRIMARY KEY (`draw_no`),
  KEY `FKo8il8u5vouc1vsf8yepvtf8uv` (`category_no`),
  KEY `FKlhn64jthhkbylx8kpj9rbl2f2` (`users_no`),
  CONSTRAINT `FKlhn64jthhkbylx8kpj9rbl2f2` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`),
  CONSTRAINT `FKo8il8u5vouc1vsf8yepvtf8uv` FOREIGN KEY (`category_no`) REFERENCES `category` (`category_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `draw`
--

LOCK TABLES `draw` WRITE;
/*!40000 ALTER TABLE `draw` DISABLE KEYS */;
/*!40000 ALTER TABLE `draw` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `likes_no` int(11) NOT NULL AUTO_INCREMENT,
  `draw_no` int(11) DEFAULT NULL,
  `users_no` int(11) DEFAULT NULL,
  PRIMARY KEY (`likes_no`),
  KEY `FK73pe9iw2rw1qrhkaj857egcy6` (`draw_no`),
  KEY `FKctxet7j06fh09p1st9s9yjv2e` (`users_no`),
  CONSTRAINT `FK73pe9iw2rw1qrhkaj857egcy6` FOREIGN KEY (`draw_no`) REFERENCES `draw` (`draw_no`),
  CONSTRAINT `FKctxet7j06fh09p1st9s9yjv2e` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `subjects_no` int(11) NOT NULL AUTO_INCREMENT,
  `subjects_nm` varchar(255) NOT NULL,
  `category_no` int(11) DEFAULT NULL,
  PRIMARY KEY (`subjects_no`),
  KEY `FKbal55sbs0mvaxe8gfm62pi87w` (`category_no`),
  CONSTRAINT `FKbal55sbs0mvaxe8gfm62pi87w` FOREIGN KEY (`category_no`) REFERENCES `category` (`category_no`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'세로선',1),(2,'가로선',1),(3,'대각선',1),(4,'점선',1),(5,'세모',2),(6,'네모',2),(7,'오각형',2),(8,'육각형',2),(9,'별',3),(10,'화살표',3),(11,'벽돌',3),(12,'집',3),(13,'나무',4),(14,'꽃',4),(15,'구름',4),(16,'물고기',4);
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `token_no` int(11) NOT NULL AUTO_INCREMENT,
  `token_refresh` varchar(255) DEFAULT NULL,
  `users_no` int(11) DEFAULT NULL,
  PRIMARY KEY (`token_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `users_no` int(11) NOT NULL AUTO_INCREMENT,
  `users_create_date` datetime(6) DEFAULT NULL,
  `users_id` varchar(255) DEFAULT NULL,
  `users_nickname` varchar(255) DEFAULT NULL,
  `users_recent_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`users_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `writes`
--

DROP TABLE IF EXISTS `writes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `writes` (
  `write_no` int(11) NOT NULL AUTO_INCREMENT,
  `write_content` varchar(255) DEFAULT NULL,
  `write_date` datetime(6) DEFAULT NULL,
  `users_no` int(11) DEFAULT NULL,
  PRIMARY KEY (`write_no`),
  KEY `FKp8w1h726233rqk8aq6q49u3xw` (`users_no`),
  CONSTRAINT `FKp8w1h726233rqk8aq6q49u3xw` FOREIGN KEY (`users_no`) REFERENCES `users` (`users_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `writes`
--

LOCK TABLES `writes` WRITE;
/*!40000 ALTER TABLE `writes` DISABLE KEYS */;
/*!40000 ALTER TABLE `writes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 22:29:14
