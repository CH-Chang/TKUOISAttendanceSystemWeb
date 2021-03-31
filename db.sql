CREATE DATABASE  IF NOT EXISTS `tkuinfocenter` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tkuinfocenter`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: tkuinfocenter
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `sex` tinyint(1) NOT NULL,
  `department` int DEFAULT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_UNIQUE` (`account`),
  KEY `fk_account_role_idx` (`role`),
  KEY `fk_account_department_department_idx` (`department`),
  CONSTRAINT `fk_account_department_department` FOREIGN KEY (`department`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_account_role_role` FOREIGN KEY (`role`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'407630390@gms.tku.edu.tw','g30UqB4g91hTCoLorIW6EMEWbjLFcHJUPAPPunXdcAs=','張智翔',1,17,3),(2,'12345@gms.tku.edu.tw','g30UqB4g91hTCoLorIW6EMEWbjLFcHJUPAPPunXdcAs=','連楨怡',0,NULL,2),(3,'admin@gms.tku.edu.tw','g30UqB4g91hTCoLorIW6EMEWbjLFcHJUPAPPunXdcAs=','開發人員',1,NULL,1),(4,'test@gms.tku.edu.tw','g30UqB4g91hTCoLorIW6EMEWbjLFcHJUPAPPunXdcAs=','測試',1,NULL,3);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` int NOT NULL,
  `ip` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_log_account_account_idx` (`account`),
  CONSTRAINT `fk_log_account_account` FOREIGN KEY (`account`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (3,1,'127.0.0.1','2020-07-27 11:11:29','成功'),(4,1,'127.0.0.1','2020-07-27 11:11:39','失敗'),(5,1,'127.0.0.1','2020-07-27 11:11:41','失敗'),(6,1,'127.0.0.1','2020-07-27 11:12:55','成功'),(7,1,'127.0.0.1','2020-07-28 07:33:43','成功'),(8,1,'127.0.0.1','2020-07-28 07:47:34','成功'),(9,1,'127.0.0.1','2020-07-28 09:27:09','成功'),(10,1,'127.0.0.1','2020-07-28 10:00:38','成功'),(11,1,'127.0.0.1','2020-07-28 12:10:58','成功'),(12,1,'127.0.0.1','2020-07-29 05:19:24','成功'),(13,1,'127.0.0.1','2020-07-29 07:18:01','成功'),(14,1,'127.0.0.1','2020-07-29 11:10:37','成功'),(15,1,'127.0.0.1','2020-07-29 11:18:52','成功'),(16,1,'127.0.0.1','2020-07-29 12:39:02','成功'),(17,1,'127.0.0.1','2020-07-30 05:35:57','成功'),(18,1,'127.0.0.1','2020-07-30 05:59:33','成功'),(19,1,'127.0.0.1','2020-07-31 02:44:40','成功'),(20,2,'127.0.0.1','2020-07-31 08:03:16','成功'),(21,1,'127.0.0.1','2020-08-28 13:06:59','成功'),(22,1,'127.0.0.1','2020-09-26 09:23:55','成功');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announce`
--

DROP TABLE IF EXISTS `announce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announce` (
  `id` int NOT NULL AUTO_INCREMENT,
  `poster` int NOT NULL,
  `title` text NOT NULL,
  `text` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_announce_manager_poster_idx` (`poster`),
  CONSTRAINT `fk_announce_manager_poster` FOREIGN KEY (`poster`) REFERENCES `manager` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announce`
--

LOCK TABLES `announce` WRITE;
/*!40000 ALTER TABLE `announce` DISABLE KEYS */;
/*!40000 ALTER TABLE `announce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arrangement`
--

DROP TABLE IF EXISTS `arrangement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arrangement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `staff` int NOT NULL,
  `week` int NOT NULL,
  `shift` int NOT NULL,
  `period` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_arrangement_shift_idx` (`shift`),
  KEY `fk_arrangement_staff_staff_idx` (`staff`),
  KEY `fk_arrangement_period_period_idx` (`period`),
  CONSTRAINT `fk_arrangement_period_period` FOREIGN KEY (`period`) REFERENCES `period` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_arrangement_shift_shift` FOREIGN KEY (`shift`) REFERENCES `shift` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_arrangement_staff_staff` FOREIGN KEY (`staff`) REFERENCES `staff` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arrangement`
--

LOCK TABLES `arrangement` WRITE;
/*!40000 ALTER TABLE `arrangement` DISABLE KEYS */;
INSERT INTO `arrangement` VALUES (1,50,3,4,1),(2,50,6,1,1),(3,50,6,2,1),(4,50,1,1,1);
/*!40000 ALTER TABLE `arrangement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow`
--

DROP TABLE IF EXISTS `borrow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `borrower` int NOT NULL,
  `approver` int NOT NULL,
  `item` int NOT NULL,
  `start` time NOT NULL,
  `end` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_borrow_item_item_idx` (`item`),
  KEY `fk_borrow_staff_borrower_idx` (`borrower`),
  KEY `fk_borrow_manager_approver_idx` (`approver`),
  CONSTRAINT `fk_borrow_item_item` FOREIGN KEY (`item`) REFERENCES `item` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_borrow_manager_approver` FOREIGN KEY (`approver`) REFERENCES `manager` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_borrow_staff_borrower` FOREIGN KEY (`borrower`) REFERENCES `staff` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow`
--

LOCK TABLES `borrow` WRITE;
/*!40000 ALTER TABLE `borrow` DISABLE KEYS */;
/*!40000 ALTER TABLE `borrow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `college`
--

DROP TABLE IF EXISTS `college`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `college` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `college`
--

LOCK TABLES `college` WRITE;
/*!40000 ALTER TABLE `college` DISABLE KEYS */;
INSERT INTO `college` VALUES (1,'文學院'),(2,'理學院'),(3,'工學院'),(4,'商管學院'),(5,'外國語文學院'),(6,'國際事務學院'),(7,'教育學院'),(8,'全球發展學院');
/*!40000 ALTER TABLE `college` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cover`
--

DROP TABLE IF EXISTS `cover`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cover` (
  `id` int NOT NULL AUTO_INCREMENT,
  `approver` int NOT NULL,
  `requester` int NOT NULL,
  `recipient` int NOT NULL,
  `date` date NOT NULL,
  `shift` int NOT NULL,
  `post` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cover_mamager_approver_idx` (`approver`),
  KEY `fk_cover_staff_requester_idx` (`requester`),
  KEY `fk_cover_staff_recipent_idx` (`recipient`),
  KEY `fk_cover_coverpost_post_idx` (`post`),
  KEY `fk_shift_shift_idx` (`shift`),
  CONSTRAINT `fk_cover_coverpost_post` FOREIGN KEY (`post`) REFERENCES `coverpost` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cover_mamager_approver` FOREIGN KEY (`approver`) REFERENCES `manager` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_cover_staff_recipent` FOREIGN KEY (`recipient`) REFERENCES `staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cover_staff_requester` FOREIGN KEY (`requester`) REFERENCES `staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_shift_shift` FOREIGN KEY (`shift`) REFERENCES `shift` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cover`
--

LOCK TABLES `cover` WRITE;
/*!40000 ALTER TABLE `cover` DISABLE KEYS */;
INSERT INTO `cover` VALUES (3,1,10,50,'2020-07-29',1,1);
/*!40000 ALTER TABLE `cover` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coverpost`
--

DROP TABLE IF EXISTS `coverpost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coverpost` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `shift` int NOT NULL,
  `poster` int NOT NULL,
  `selected` int DEFAULT NULL,
  `approved` int DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_coverpost_staff_poster_idx` (`poster`),
  KEY `fk_coverpost_cover_approved_idx` (`approved`),
  KEY `fk_coverpost_coverresponse_selected_idx` (`selected`),
  KEY `fk_coverpost_shift_shift_idx` (`shift`),
  CONSTRAINT `fk_coverpost_cover_approved` FOREIGN KEY (`approved`) REFERENCES `cover` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_coverpost_coverresponse_selected` FOREIGN KEY (`selected`) REFERENCES `coverresponse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_coverpost_shift_shift` FOREIGN KEY (`shift`) REFERENCES `shift` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_coverpost_staff_poster` FOREIGN KEY (`poster`) REFERENCES `staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coverpost`
--

LOCK TABLES `coverpost` WRITE;
/*!40000 ALTER TABLE `coverpost` DISABLE KEYS */;
INSERT INTO `coverpost` VALUES (1,'2020-07-28',1,10,1,3,'2020-07-31 08:14:14');
/*!40000 ALTER TABLE `coverpost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coverresponse`
--

DROP TABLE IF EXISTS `coverresponse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coverresponse` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post` int NOT NULL,
  `recipient` int NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_coverresponse_coverpost_post_idx` (`post`),
  KEY `fk_coverresponse_staff_recipient_idx` (`recipient`),
  CONSTRAINT `fk_coverresponse_coverpost_post` FOREIGN KEY (`post`) REFERENCES `coverpost` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_coverresponse_staff_recipient` FOREIGN KEY (`recipient`) REFERENCES `staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coverresponse`
--

LOCK TABLES `coverresponse` WRITE;
/*!40000 ALTER TABLE `coverresponse` DISABLE KEYS */;
INSERT INTO `coverresponse` VALUES (1,1,50,'2020-07-31 08:14:26');
/*!40000 ALTER TABLE `coverresponse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `college` int NOT NULL,
  `bachelor` tinyint(1) DEFAULT NULL,
  `master` tinyint(1) DEFAULT NULL,
  `doctor` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_department_college_college_idx` (`college`),
  CONSTRAINT `fk_department_college_college` FOREIGN KEY (`college`) REFERENCES `college` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'中國語文學系',1,1,1,1),(2,'歷史學系',1,1,1,0),(3,'資訊與圖書館學系',1,1,1,0),(4,'大眾傳播學系',1,1,1,0),(5,'資訊傳播學系',1,1,1,0),(6,'數學學系',2,1,1,1),(7,'物理學系',2,1,1,0),(8,'化學學系',2,1,1,0),(9,'尖端材料科學學士學位學程',2,1,0,0),(10,'理學院應用科學博士班',4,0,0,1),(11,'建築學系',3,1,1,0),(12,'土木工程學系',3,1,1,1),(13,'水資源及環境工程學系',3,1,1,1),(14,'機械與機電工程學系',3,1,1,1),(15,'化學工程與材料工程學系',3,1,1,1),(16,'電機工程學系',3,1,1,1),(17,'資訊工程學系',3,1,1,1),(18,'航空太空工程學系',3,1,1,0),(19,'國際企業學系',4,1,1,0),(20,'財務金融學系',4,1,1,1),(21,'風險管理與保險學系',4,1,1,0),(22,'產業經濟學系',4,1,1,1),(23,'經濟學系',4,1,1,0),(24,'企業管理學系',4,1,1,0),(25,'會計學系',4,1,1,0),(26,'統計學系',4,1,1,0),(27,'資訊管理學系',4,1,1,0),(28,'運輸管理學系',4,1,1,0),(29,'公共行政學系',4,1,1,0),(30,'管理科學學系',4,1,1,1),(31,'商管學院大數據分析與商業智慧碩士學位學程 ',4,0,1,0),(32,'數位商務與經濟碩士學位學程',4,0,1,0),(33,'商管學院經營管理全英語碩士學位學程',4,0,1,0),(34,'淡江大學暨澳洲昆士蘭理工大學財金全英語雙碩士學位學程',4,0,1,0),(35,'商管學院大數據分析與商業智慧碩士學位學程',4,0,1,0),(36,'英文學系',5,1,1,1),(37,'西班牙語文學系',5,1,0,0),(38,'法國語文學系',5,1,1,0),(39,'德國語文學系',5,1,0,0),(40,'日本語文學系',5,1,1,0),(41,'俄國語文學系',5,1,0,0),(42,'歐洲研究所',6,0,1,1),(43,'拉丁美洲研究所',6,0,1,0),(44,'國際事務與戰略研究所',6,0,1,1),(45,'日本政經研究所',6,0,1,0),(46,'中國大陸研究所',6,0,1,0),(47,'臺灣與亞太研究全英語碩士學位學程',6,0,1,0),(48,'教育科技學系',7,1,1,0),(49,'教育政策與領導研究所',7,0,1,0),(50,'教育心理與諮商研究所',7,0,1,0),(51,'未來學研究所',7,0,1,0),(52,'課程與教學研究所',7,0,1,0),(53,'教育學院教育領導與科技管理博士班',7,0,0,1),(54,'資訊創新與科技學系',8,1,0,0),(55,'國際觀光管理學系全英語學士班',8,1,0,0),(56,'英美語言文化學系全英語學士班',8,1,0,0),(57,'全球政治經濟學系全英語學士班',8,1,0,0);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `total` int NOT NULL,
  `current` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_manager_account_account_idx` (`account`),
  CONSTRAINT `fk_manager_account_account` FOREIGN KEY (`account`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
INSERT INTO `manager` VALUES (1,2);
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `period`
--

DROP TABLE IF EXISTS `period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `period` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `priority` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `period`
--

LOCK TABLES `period` WRITE;
/*!40000 ALTER TABLE `period` DISABLE KEYS */;
INSERT INTO `period` VALUES (1,'學期','2020-06-14','2021-01-17',1),(2,'期中考','2020-08-16','2020-11-22',2),(3,'期末考','2021-01-11','2021-01-17',2);
/*!40000 ALTER TABLE `period` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'開發人員'),(2,'主管'),(3,'工讀生');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `staff` int NOT NULL,
  `date` date NOT NULL,
  `shift` int NOT NULL,
  `checkin` datetime DEFAULT NULL,
  `checkout` datetime DEFAULT NULL,
  `cover` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_schedule_staff_staff_idx` (`staff`),
  KEY `fk_schedule_shift_shift_idx` (`shift`),
  KEY `fk_schedule_cover_cover_idx` (`cover`),
  CONSTRAINT `fk_schedule_cover_cover` FOREIGN KEY (`cover`) REFERENCES `cover` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_schedule_shift_shift` FOREIGN KEY (`shift`) REFERENCES `shift` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_schedule_staff_staff` FOREIGN KEY (`staff`) REFERENCES `staff` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,50,'2020-07-25',1,'2020-07-25 08:11:00','2020-07-25 12:11:00',NULL),(2,50,'2020-07-25',2,NULL,NULL,NULL),(3,50,'2020-07-22',4,'2020-07-22 17:44:11','2020-07-22 21:20:00',NULL),(4,50,'2020-07-26',5,'2020-07-26 20:55:00','2020-07-27 08:31:00',NULL),(12,50,'2020-07-29',1,'2020-07-29 07:10:00','2020-07-29 12:15:00',3);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shift` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `start` time NOT NULL,
  `end` time NOT NULL,
  `hour` decimal(3,1) NOT NULL,
  `payhour` decimal(3,1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shift`
--

LOCK TABLES `shift` WRITE;
/*!40000 ALTER TABLE `shift` DISABLE KEYS */;
INSERT INTO `shift` VALUES (1,'早上班','08:10:00','12:10:00',4.0,4.0),(2,'中午班','12:05:00','14:05:00',2.0,2.0),(3,'下午班','14:00:00','18:00:00',4.0,4.0),(4,'晚上班','17:45:00','21:15:00',3.5,3.5),(5,'大夜班','21:00:00','08:30:00',11.5,14.0);
/*!40000 ALTER TABLE `shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` int NOT NULL,
  `account` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_staff_account_account_idx` (`account`),
  CONSTRAINT `fk_staff_account_account` FOREIGN KEY (`account`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (50,1),(10,4);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-30  9:57:32
