-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Sam 15 Décembre 2018 à 16:11
-- Version du serveur :  5.7.24-0ubuntu0.18.04.1
-- Version de PHP :  7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `dune_api`
--

-- --------------------------------------------------------

--
-- Structure de la table `access_token`
--

CREATE TABLE `access_token` (
  `access_token_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `access_token` text,
  `device_type` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `access_token`
--

INSERT INTO `access_token` (`access_token_id`, `user_id`, `access_token`, `device_type`) VALUES
(1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQyOTEwNzk2LCJleHAiOjE1NDM1MTU1OTZ9.WcbeDSm7q0Uov4MkHXpjzJ-Bnv54RedUqmoLakcaCbQ', 'ios'),
(2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQyOTEwODE2LCJleHAiOjE1NDM1MTU2MTZ9.yftxV5FxjgbpZkcm23_ufvQXmVIcyJR0DdAzkSYZv08', 'ios'),
(3, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQyOTEwODM5LCJleHAiOjE1NDM1MTU2Mzl9.nA7XRkqettzX5xWO2ToBryiNxzP7Labg5SKpMMBJopY', 'ios'),
(4, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQyOTEwOTY5LCJleHAiOjE1NDM1MTU3Njl9.LtQyxlimoZQdZIL82Asx_dx6UVopLBuaoU-4ZZqXhao', 'ios'),
(5, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQyOTExMDE4LCJleHAiOjE1NDM1MTU4MTh9.Q2NCOA4T2sSY3NE0x1KePPkvqrt35PzrCLpsW-V6WSs', 'ios'),
(6, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQyOTExMTgyLCJleHAiOjE1NDM1MTU5ODJ9.t0-QnqbkZDLxSTokYkU5uzdMNEnSa5i3Dg7wGc9PPro', 'ios'),
(7, 25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTU0MzE1MTY3MSwiZXhwIjoxNTQzNzU2NDcxfQ.6LK-C7H5KdBRtzvzhB1Pw0vLHROFgcvV4x1uZn-ywhQ', 'web'),
(8, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzE1NzgwNSwiZXhwIjoxNTQzNzYyNjA1fQ.Mw_ztVfSAAOGvGSnOi_hQxtzXrMEVlSdmH_d1wrMeGQ', 'android'),
(9, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzE1ODI5MiwiZXhwIjoxNTQzNzYzMDkyfQ.2YWYzvosMO1e1a0Zwpdnl9iiZpsF6hGOcOkG3VMMZ2w', 'android'),
(10, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzE2MjkxMCwiZXhwIjoxNTQzNzY3NzEwfQ.2HCzibDDfH9JBlEdfF596VyRPEwO03UFILupitgAxVo', 'android'),
(11, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzE2MzQ1NSwiZXhwIjoxNTQzNzY4MjU1fQ.KCxE4kwzmcU9evgGf6ygUfCoPOFkV8Rq1Dv1HP2a1j4', 'android'),
(12, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzE2MzgyMywiZXhwIjoxNTQzNzY4NjIzfQ.UP13c1EJf-JMSELABt0YQo8BR_k6aLks_Q-I2sRvQlw', 'android'),
(13, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzE2NDAwOSwiZXhwIjoxNTQzNzY4ODA5fQ.zVm9d6bd5aPYo4osgHa4-7WC81nhHVqPdCC6s4h8Fy0', 'android'),
(14, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzE2NDA2NywiZXhwIjoxNTQzNzY4ODY3fQ.5zfblZxGDRzgwQQoRgghkg5giw0p56A4D2sab-mydjA', 'android'),
(15, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzE2NTAxNywiZXhwIjoxNTQzNzY5ODE3fQ.G1yiXFOaQcSwfm0aKCKVz4WfaKJh39LWJgrCoXG943Y', 'android'),
(16, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzE2NTQ0NiwiZXhwIjoxNTQzNzcwMjQ2fQ.x3fLMnSF3eLkcJe4dhFRJOrHfpliomBgIy2BKZ7N53Y', 'android'),
(17, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzE2NTgxOSwiZXhwIjoxNTQzNzcwNjE5fQ.oK8B4RExqEQA1ZQFMuHvuCBWcl4ja5TL3rZOaOl-RRY', 'android'),
(18, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzE2NjM2OSwiZXhwIjoxNTQzNzcxMTY5fQ.UgmGOn6YmrKR_uDYTJR-LmBPS4a97osWqmuwJVY6i8c', 'android'),
(19, 25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTU0MzE2Njc1OSwiZXhwIjoxNTQzNzcxNTU5fQ.RA6WRzr4gatQ76_A1ZAEcJdxDiCRWzDYO6qn20Kaj44', 'web'),
(20, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzE2Njc3NywiZXhwIjoxNTQzNzcxNTc3fQ.00zxH43rWP6E231N9RrhT7glINIZzHpUpYJf75XMFvw', 'android'),
(21, 28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTU0MzE3MDY2NiwiZXhwIjoxNTQzNzc1NDY2fQ.c72gu64Hhwbb6QOtRd_RDug62EdZ4c0fgLZRt6Ta_64', 'web'),
(22, 28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTU0MzE3MTI1NCwiZXhwIjoxNTQzNzc2MDU0fQ.f47T2uuRRibbJfowVjaY7nYIMHv8HDEeCCUGr_EauOo', 'web'),
(23, 25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTU0MzI0MDA1NywiZXhwIjoxNTQzODQ0ODU3fQ.Jbt01FRQe59IpLFHqmOrchgDPRHT1gnTS_47gr-JmBw', 'web'),
(24, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzI0MDA3NSwiZXhwIjoxNTQzODQ0ODc1fQ.00PwWWaPDiRs3WGdv_eneTrkOUzzOuLZqN8nM07bX44', 'android'),
(25, 25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTU0MzI0MDE3NywiZXhwIjoxNTQzODQ0OTc3fQ.Upn-ddRMrZBNha81xKis61HX_J4nnPdsTKe36sT-ep0', 'web'),
(26, 25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInBlcm0iOjEsImlhdCI6MTU0MzI0MDIzMCwiZXhwIjoxNTQzODQ1MDMwfQ.-ewXIu9kVmJQgUOiFDlyJ3sBUIJt3w7R2OOQekVb1ls', 'web'),
(27, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInBlcm0iOjIsImlhdCI6MTU0MzI0MDI3MiwiZXhwIjoxNTQzODQ1MDcyfQ.w0P9Ny-7XTrFj3heXuU7XAqaNvSP4X0obeML6XMzXKE', 'android'),
(28, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzMjQzMTM5LCJleHAiOjE1NDM4NDc5Mzl9.NV0y0sbHovep0F6xs_Tu9zXc-BqK9swgIqIF53SYTJk', 'ios'),
(29, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzNDE2MDI4LCJleHAiOjE1NDQwMjA4Mjh9.HiBT6z5TFGrz4tNFRpzwWurHkYoCSUOEGgOv2_vU68Y', 'ios'),
(30, 25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTU0MzQxNjE3NywiZXhwIjoxNTQ0MDIwOTc3fQ.N9wKOToi5LiSFB_g2SORb4T8oJ049-vPgbHPApo4d18', 'web'),
(31, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0MzUzODY4MiwiZXhwIjoxNTQ0MTQzNDgyfQ.XI5JHXqexb-b8jcOoQ_CSUqsMQuPGIVaTWOdiEAuZso', 'android'),
(32, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInBlcm0iOjIsImlhdCI6MTU0MzUzODcwOSwiZXhwIjoxNTQ0MTQzNTA5fQ.Uayne_DojgH2IzzxV6Ps0lFA7Q9r5BzoG2-H1kNyI0Y', 'android'),
(33, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInBlcm0iOjIsImlhdCI6MTU0MzUzODg2NywiZXhwIjoxNTQ0MTQzNjY3fQ.xaj8_dTwc4qLNupvAYcONzOmzVZ9em6cxihfE4Ob798', 'android'),
(34, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzNTc3OTgwLCJleHAiOjE1NDQxODI3ODB9.gtUMC44puBMv2NsFp1i7-J76zg0we7bY368X9U2O4H4', 'ios'),
(35, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzNjAwMzYwLCJleHAiOjE1NDQyMDUxNjB9.Bw1H7WbC3zDfUW8lIktYjW3FThEhux7wWw7Y4NCvV4w', 'ios'),
(36, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzNzYyNTY1LCJleHAiOjE1NDQzNjczNjV9.Fkl_iUJEeeNyvdL-2LgZEkmSjT2LcZk-JRb8XjmGKjc', 'ios'),
(37, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzNzY0ODI1LCJleHAiOjE1NDQzNjk2MjV9.J6zsdvf7FseveZdcuibMvhZ9Q9ljzdwojeUHoVkZToU', 'ios'),
(38, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzNzY0OTAzLCJleHAiOjE1NDQzNjk3MDN9.RZ9uYL5E_vXmoaP7AG1B882iUWMxawRKnuR57wbA798', 'ios'),
(40, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzNzY1MTUwLCJleHAiOjE1NDQzNjk5NTB9.Z4zkCOLfF4h-Z0D1KiMAoF6bV6es1UWV23ypudugDeY', 'ios'),
(41, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzNzY1MTYwLCJleHAiOjE1NDQzNjk5NjB9.0FmW60AWs4LWZ9CiyhMTON6dqoT14g2XVy2MIoVRwI4', 'ios'),
(42, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzNzY1MjUxLCJleHAiOjE1NDQzNzAwNTF9.h0MIaEmUrVI7sJ6N2XFGpGtQVeyrp-MpCRapPzUpC9o', 'ios'),
(43, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzNzY1MjcxLCJleHAiOjE1NDQzNzAwNzF9.nUaWAinse1ygiH6bRuks8X7LfM7p0DpRJbd66YA1C2w', 'ios'),
(44, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzNzY1MzMwLCJleHAiOjE1NDQzNzAxMzB9.gmiJsn-j2CCJkFEN2F7kycZdZDtdkUMXfQT953EiNGE', 'ios'),
(45, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzNzY1MzM4LCJleHAiOjE1NDQzNzAxMzh9.VK6SbCt0weiLvrPCs_tzvXcXBofIRYDy6aCHfuPjqyg', 'ios'),
(46, 25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTU0Mzg1NDg1MSwiZXhwIjoxNTQ0NDU5NjUxfQ.IKmaxmtr7H6K8T7MzjVzxGLFxp7gkZPuJSkOBQ0Vvjw', 'web'),
(47, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0Mzg1NDg4MiwiZXhwIjoxNTQ0NDU5NjgyfQ.w18KMtDxE1BL55Y-KV6_cqL4mu8N8v61_UofIm_9RZw', 'android'),
(48, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MDIwNjcyLCJleHAiOjE1NDQ2MjU0NzJ9.G0lZpUw8kweBYjmTXlC_o6IvhRJwkERcnY1m7dGlx1k', 'ios'),
(49, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MDIwNzg2LCJleHAiOjE1NDQ2MjU1ODZ9.oDgNtwliZHGPwLagzcZyQrTCmaAjehBnRB_kR7hbWrM', 'ios'),
(50, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MDIwOTM2LCJleHAiOjE1NDQ2MjU3MzZ9.6aeshU7ArHMi5YTKKpBqUKSk-mo3behZQC62qCqBm0E', 'ios'),
(51, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MDIxMzQ5LCJleHAiOjE1NDQ2MjYxNDl9.YHiAxPVPQ7hGAtDUtHKa1FYbvarjtPkun_sEV3JnFPI', 'ios'),
(52, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MDIxMzc4LCJleHAiOjE1NDQ2MjYxNzh9.5ollozhWaAI9vLnUfLX6qCFkhy6wikKe6Hzck95k4T4', 'ios'),
(53, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MDIxNzgwLCJleHAiOjE1NDQ2MjY1ODB9.YbaNsoQxYBU-X32osKrdWJJZMfrBXXcaKaYbcETWAOo', 'ios'),
(54, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0NDAyNjgwNCwiZXhwIjoxNTQ0NjMxNjA0fQ.Fw34NILv6CmXvQlQKA8W7O0dOaguX3myevI9DQMdO5E', 'android'),
(55, 25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTU0NDAyNjg0MywiZXhwIjoxNTQ0NjMxNjQzfQ.d3vlUqgE24cDsAjejJBJX28uNL6JwBuDZyruhogZYro', 'web'),
(56, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0NDAyNzI1MSwiZXhwIjoxNTQ0NjMyMDUxfQ.ND186xoYRbqVdp6hRFzql4KbdHxM-SD1_x0WiYAFFf0', 'android'),
(57, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0NDAyNzMzOSwiZXhwIjoxNTQ0NjMyMTM5fQ.Sw4cl0by3cnWkNLIWNwSiNF_4bVKKfNUnIMnSNJREME', 'android'),
(58, 27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0NDAyNzM4MywiZXhwIjoxNTQ0NjMyMTgzfQ.mLFAIMijQfe1NvDyRJ8e_YZ4UmwW84A3HyEtNs7KmiI', 'android'),
(59, 25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTU0NDAyNzUwMSwiZXhwIjoxNTQ0NjMyMzAxfQ.kTWRNQUGmUJgJ5mnPOSeNO3FyBiTuvKljBYYlZNal6I', 'web'),
(60, 28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTU0NDAyNzkxMiwiZXhwIjoxNTQ0NjMyNzEyfQ.-MplK8eWOW8b53Zk5kEg9BURw73Zh1_5Z7kF2QUCYQU', 'web'),
(61, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MDI4MjI1LCJleHAiOjE1NDQ2MzMwMjV9.3Y2cr3xuXbjp6ICI2EE5ANpIj0tx-0yOdR_Euiidvws', 'ios'),
(62, 28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTU0NDEwNzQ0NCwiZXhwIjoxNTQ0NzEyMjQ0fQ.puAiz9b5x1YYKleYNVueAsWPhhH1BiCOBE-rZ_mms-c', 'web'),
(63, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTE0NTIzLCJleHAiOjE1NDQ3MTkzMjN9.WntLUQH5y4FMa7qUiy6dnZ4YXSh-exM5HPnmfVset-E', 'ios'),
(64, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDExNTIxOCwiZXhwIjoxNTQ0NzIwMDE4fQ.z0gyuL6kTbSvvI--pTNNkGDJVJU6i5koKyb7Y8_Ilgg', 'web'),
(65, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTE1Mjg4LCJleHAiOjE1NDQ3MjAwODh9.l4NSi9qt3fJOLJyfvzwZ2eDXKXlMlYj3g2_ftpQnLQA', 'ios'),
(66, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTE1Mjg4LCJleHAiOjE1NDQ3MjAwODh9.l4NSi9qt3fJOLJyfvzwZ2eDXKXlMlYj3g2_ftpQnLQA', 'ios'),
(67, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDExNTQ0OSwiZXhwIjoxNTQ0NzIwMjQ5fQ._pxacxJ5iRc_kpEWpP0Th2bn7_xZPJ-QgLsRaHmKvbI', 'web'),
(68, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTE1ODU4LCJleHAiOjE1NDQ3MjA2NTh9.CX213w3awBz1ZfLZvvkpNxaoEH1Dkh3Iiww_51odwQ4', 'ios'),
(69, 31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTU0NDExNjE1NCwiZXhwIjoxNTQ0NzIwOTU0fQ.KpYKR-ommxoV4YZDWcYKyBsHRX7redVstvBllPLh8Z8', 'android'),
(70, 32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTU0NDExNjc1NiwiZXhwIjoxNTQ0NzIxNTU2fQ.OUN35G1LZs8gTr1iR3m7VSJzC_HerRFQ4_wiv5DCWss', 'android'),
(71, 33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImlhdCI6MTU0NDExNjgwOCwiZXhwIjoxNTQ0NzIxNjA4fQ.IhZJ7mP-WkOEvHieBDtNzSZBq7DDhPRQg-fdUlv7KHU', 'web'),
(72, 31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTU0NDExODM4MywiZXhwIjoxNTQ0NzIzMTgzfQ.pvZfS-1JNmY_JVjNIEknSzepU3c4vuw86TD6pQF4Zl8', 'android'),
(73, 32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTU0NDExODUwNCwiZXhwIjoxNTQ0NzIzMzA0fQ.hezuP2PyLKvIlS9DEyGVB5XLTPloLKxBn2r8IQ1seaU', 'android'),
(74, 33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImlhdCI6MTU0NDExODU2MCwiZXhwIjoxNTQ0NzIzMzYwfQ.odTL9_3GRrtKLpwqG6-9VTXw7Qhj-_qgJLoa8-Abw-g', 'web'),
(75, 31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTU0NDExOTM1MywiZXhwIjoxNTQ0NzI0MTUzfQ.Pncg_PyFh8FwzWxXe6doJys1vD7UGBMMB9W2rHEAHB4', 'android'),
(76, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDExOTYzNywiZXhwIjoxNTQ0NzI0NDM3fQ.FQR6MaRGNYgAgli3_BeCaHs9ZPYHvuYHGPVy037ERNw', 'web'),
(77, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTE5NjQ5LCJleHAiOjE1NDQ3MjQ0NDl9.Ai_NnCPEboXQ_tFpbwoSTHtrP0WzpG4KyMUW0C37iJs', 'ios'),
(78, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDEyMDU0NywiZXhwIjoxNTQ0NzI1MzQ3fQ.A2cP5OXfjVcT8qVe-74gl4I1r4akO9el84PNJTbGeE8', 'web'),
(79, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTIwNTgxLCJleHAiOjE1NDQ3MjUzODF9.a0eHXBox5HDJzFA4IgKysyUw7NzLdT8fvGcFc5e_yd4', 'ios'),
(80, 31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTU0NDEyMDU4MywiZXhwIjoxNTQ0NzI1MzgzfQ.oBzm0RtmZdppren99l6i6c7ecWOToqA9vKfBy0EoScc', 'android'),
(81, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDEyMjMzNiwiZXhwIjoxNTQ0NzI3MTM2fQ.RLb3KJ9ksG7gY8pUXZdsjNM-qKTg0PL-CNeWPE4BMTs', 'web'),
(82, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTIyNzAwLCJleHAiOjE1NDQ3Mjc1MDB9.CGBc1Dcjqi99ahfX8tb0Q1-cYi6vjxNtRNHXbzXN3Nk', 'ios'),
(83, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDEyMjczNCwiZXhwIjoxNTQ0NzI3NTM0fQ.S7NobilhEO-ALbCK1799svRo0cnaTDapYbmkzrKOtjw', 'web'),
(84, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTIyNzk2LCJleHAiOjE1NDQ3Mjc1OTZ9.sErxofHqoKbSIPoCkHhsUogN_tm2tTF9eAdasRK8Q6k', 'ios'),
(85, 33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImlhdCI6MTU0NDEyMzI4NCwiZXhwIjoxNTQ0NzI4MDg0fQ.Zwz_FFO961JkcjtuQtwFswxkRSwj_6HQv3AvHNZ-n4g', 'web'),
(86, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTIzNDEwLCJleHAiOjE1NDQ3MjgyMTB9.MqPOoDxtrW_8v8_LscpGGuBdV6uBoi2e2Xq9Qd3D7WQ', 'ios'),
(87, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTIzNjQ0LCJleHAiOjE1NDQ3Mjg0NDR9.DPiAmvzrHjLgKRRHjNkYsWaWXAhIwi8pE4xwAgHvBxI', 'ios'),
(88, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTI0MzQzLCJleHAiOjE1NDQ3MjkxNDN9.Pt1AUYNFae6VXp9KSG2E4_bdydGw1g2P_Tiu6q86pc4', 'ios'),
(89, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTM2NDM5LCJleHAiOjE1NDQ3NDEyMzl9.nm9V9YKduFzTm3OcXmIyaBgM1Z-TLijdImRryLp_toM', 'ios'),
(90, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDEzNzA0NSwiZXhwIjoxNTQ0NzQxODQ1fQ.DaPaxO-_phE8N5KxpfOD2Z19NUHOay5lsNF7vVz61V0', 'web'),
(91, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTM3MTM4LCJleHAiOjE1NDQ3NDE5Mzh9.cN_A9eJyCxjXWRjxa6eQbCsiNQOtOxGJO2FIeOPKcP8', 'ios'),
(92, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MTc1MzgwLCJleHAiOjE1NDQ3ODAxODB9.z7urEUDXFOKF-ubBvS2zigRmTjNZQhFEzMfd4uwGL9Y', 'ios'),
(93, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDI2NDQ5MCwiZXhwIjoxNTQ0ODY5MjkwfQ._WnmTCSVglIuw7URJgemGW38jwZD-qG23dFOCEvpTmc', 'web'),
(94, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDI2NDUwNiwiZXhwIjoxNTQ0ODY5MzA2fQ.fD6KSMOyWbZLnIifnJxdiNxaJsjZAvH8qt7Enm2J1qI', 'web'),
(95, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MjY0NTE5LCJleHAiOjE1NDQ4NjkzMTl9.S8bldAavt_vxSy1i3KmmTq7riCG35ivgsz9yVhxLEEM', 'ios'),
(96, 31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTU0NDMwMTQxNywiZXhwIjoxNTQ0OTA2MjE3fQ.GkU2I1LNYk6ElW5smdGG8JxKjM0T5tHZYFOS-k3vEFo', 'android'),
(97, 33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImlhdCI6MTU0NDMwMTc3NywiZXhwIjoxNTQ0OTA2NTc3fQ.wwi0ElAQ6DVD0nxqCCNwF6eSR_vXHRyy3kz15VOH0ec', 'web'),
(98, 31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTU0NDM3NTY0MSwiZXhwIjoxNTQ0OTgwNDQxfQ.4zXIdhqxjNMlDvG4XHYuppUwzUc0_hgoBcyW73O3iWQ', 'android'),
(99, 33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImlhdCI6MTU0NDM3NTY4NSwiZXhwIjoxNTQ0OTgwNDg1fQ.GY6PF0wBxFv4B0PG6fkyNe4uW1f1AP1FoyqOioiYOW8', 'web'),
(100, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDM3NzYzMSwiZXhwIjoxNTQ0OTgyNDMxfQ._whToSJfULS-G6epmtkikeFZcvTJXgjjs7ivaZ1Cx-8', 'web'),
(101, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0Mzc3NjQ2LCJleHAiOjE1NDQ5ODI0NDZ9.LNgv-ebMvESI6QPNBdP8XjTQHJfGkXBRJQPy8pnWmGA', 'ios'),
(102, 33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImlhdCI6MTU0NDM3NzY2MywiZXhwIjoxNTQ0OTgyNDYzfQ.I6od4sosm-EYiDq3Tg4SpkEEV8Zjn_ORliT3bZ-FHwE', 'web'),
(103, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NTQxMywiZXhwIjoxNTQ1MDYwMjEzfQ.W_TPjI5remDLg4CJH0lMsLsADgSAlH3W0I-o7UdudI8', 'web'),
(104, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NTU5NCwiZXhwIjoxNTQ1MDYwMzk0fQ.9pxnD7SvFGmdAjHJlZH0Ciynqp-9VG1DdnRChyAv230', 'web'),
(105, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NTYyOSwiZXhwIjoxNTQ1MDYwNDI5fQ.IIbtDI9fgPEEgL0oRfpxYX_2ps-RISZpie4EAbWBRGk', 'web'),
(106, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NTczMCwiZXhwIjoxNTQ1MDYwNTMwfQ.4MN8fGziCfY95Js7ZPEfVh6adOPks-8ji4kXzhRWcc8', 'web'),
(107, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NTc2NSwiZXhwIjoxNTQ1MDYwNTY1fQ.xX63gA99aZs0LiTLUAWEWT29626LV7t1P8N9j1PkJFs', 'web'),
(108, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NTc3OSwiZXhwIjoxNTQ1MDYwNTc5fQ.SVK-_PpEDocuzQELKtwlcc-rn883746wTfoC2L9UPcw', 'web'),
(109, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NTg2OCwiZXhwIjoxNTQ1MDYwNjY4fQ.WAzG6FwqPzkZoDdx6oiqe1yLHl_igd8lU_L_mVN6vF8', 'web'),
(110, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NjY4MCwiZXhwIjoxNTQ1MDYxNDgwfQ.g1_uJok4esGXVgkhqmEWXwmc4rcF8BcEm1V4x_kUIp8', 'web'),
(111, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NjgxNywiZXhwIjoxNTQ1MDYxNjE3fQ.XIl8X8QBMkQOLRJrc4jZyIV5FLfymtdxzs9J4ZSHYsM', 'web'),
(112, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NjgzNywiZXhwIjoxNTQ1MDYxNjM3fQ.WG2jXu3bR3Jb6QnQxpTFoEzwpgP6TWmh_oeX1f5EeJs', 'web'),
(113, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1Njk1MiwiZXhwIjoxNTQ1MDYxNzUyfQ.1OfoFaOdvGR0wc6segL0BtiLMTZIGA6eHD6Aw65PDAQ', 'web'),
(114, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NzA4NSwiZXhwIjoxNTQ1MDYxODg1fQ.hrL1Kxy7Mczjgc5lkg1zGw_3biGIalUT4fusZmde79U', 'web'),
(115, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NzA5MCwiZXhwIjoxNTQ1MDYxODkwfQ.CcYj9Vp94_O79nJ6eIAl5-7C6N7T1r_GT5CEE5whhl4', 'web'),
(116, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NzI4MSwiZXhwIjoxNTQ1MDYyMDgxfQ.5gzoFRbkY9LU_DZqiF2fO8DxbH9iy08aUVg_4AhSjyw', 'web'),
(117, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0NDU3MzAxLCJleHAiOjE1NDUwNjIxMDF9.-bBLC2ZKE0QnVyiJt-Fo8R-mfhuoSmy1voTPejSVCKQ', 'ios'),
(118, 30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NzUyNiwiZXhwIjoxNTQ1MDYyMzI2fQ.IiYMCdAooGivgUXmN4iTQ_ifhhvgm8vyQCoOOkLXTqg', 'web'),
(119, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0NDU3NTY2LCJleHAiOjE1NDUwNjIzNjZ9.U_6yM9zBUzxcUBMubV23EGWn3FLvWPvZzcAd565zBzw', 'ios'),
(120, 28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTU0NDUzOTUxOCwiZXhwIjoxNTQ1MTQ0MzE4fQ.-SoOFk-iqUP4JZvXs17ZpdUVlqdS30AtEP-E-JVMESM', 'web'),
(121, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0NTQ3NjcwLCJleHAiOjE1NDUxNTI0NzB9.R79oxbttz26zrnJdNjBsOxj8uUUrZHug7fIqT88v63I', 'ios'),
(122, 25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTU0NDU0OTczNiwiZXhwIjoxNTQ1MTU0NTM2fQ.MYFzJcUAYY-tmHhgY9QZhcphd3MnV6PTWsS_V0K2u5o', 'web'),
(123, 28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTU0NDYyODYxMiwiZXhwIjoxNTQ1MjMzNDEyfQ.vGDvethTcGRx_99gNbGiJFzNcqsGWtdrkecnMyTpnX0', 'web'),
(124, 33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInBlcm0iOjIsImlhdCI6MTU0NDYzMzQ5OCwiZXhwIjoxNTQ1MjM4Mjk4fQ.q_zLS9zj-j3-ID8bu5NUtBWwsUVkl3sp0ILnLzkMVFo', 'web'),
(125, 33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInBlcm0iOjIsImlhdCI6MTU0NDYzMzc3MywiZXhwIjoxNTQ1MjM4NTczfQ.DHabCsC-31F3IBVt0GVpPxh96yfP-8PbEmiD1KiJJy0', 'web'),
(126, 33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInBlcm0iOjIsImlhdCI6MTU0NDYzMzgzNiwiZXhwIjoxNTQ1MjM4NjM2fQ.LB9rgb-7cLIlDBJO8lwjlgNJLkafDNpI2mA0iXPZxaI', 'web'),
(127, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0ODE0NTk0LCJleHAiOjE1NDU0MTkzOTR9.oHRgyo-SxD8kZhC_TfdCzgxwqSqJjmgdT2rYORZDIes', 'ios'),
(128, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0ODE0NzcyLCJleHAiOjE1NDU0MTk1NzJ9.9zpcG7OJU4Isp4dveBfghdoEnajuWlMMnb8GdkQvjhA', 'ios'),
(129, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0ODE0ODM3LCJleHAiOjE1NDU0MTk2Mzd9.V8up6GxC7kaWCV35pXTscbKo1n-5Xyc-lbX9PKlbsmI', 'ios'),
(130, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGVybSI6MiwiaWF0IjoxNTQ0ODE0ODc0LCJleHAiOjE1NDU0MTk2NzR9.bXBLaHu9rRRx_-fP77f5xNDCGA2-c-XiTKvetDpf_ZI', 'ios'),
(131, 28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTU0NDg4NTg3MSwiZXhwIjoxNTQ1NDkwNjcxfQ.Ymj0VEYLGEN7K5rLoyGtr7FZhf3PsED629cM_JaAbP8', 'web'),
(132, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0ODg1OTMxLCJleHAiOjE1NDU0OTA3MzF9.R19ji4jxLVPxdhyHtK_4A_zhdR6_4-8i6fwX_g34_IQ', 'ios'),
(133, 33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInBlcm0iOjIsImlhdCI6MTU0NDg5MDIwMiwiZXhwIjoxNTQ1NDk1MDAyfQ.rbmQFtOXYYHTQIQDnjMdUyYgaOVyuWaSlI5hlhANe3g', 'web');

-- --------------------------------------------------------

--
-- Structure de la table `d_classe`
--

CREATE TABLE `d_classe` (
  `idClasse` int(6) NOT NULL,
  `level` int(2) NOT NULL,
  `num` int(11) NOT NULL,
  `annee` varchar(9) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `d_classe`
--

INSERT INTO `d_classe` (`idClasse`, `level`, `num`, `annee`) VALUES
(1, 4, 1, '2017/2018'),
(2, 8, 1, '2017/2018'),
(3, 5, 1, '2017/2018'),
(4, 5, 2, '2017/2018'),
(5, 7, 1, '2017/2018');

-- --------------------------------------------------------

--
-- Structure de la table `d_classeEcole`
--

CREATE TABLE `d_classeEcole` (
  `idClasse` int(6) NOT NULL,
  `idEcole` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `d_classeEcole`
--

INSERT INTO `d_classeEcole` (`idClasse`, `idEcole`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1);

-- --------------------------------------------------------

--
-- Structure de la table `d_classeEleve`
--

CREATE TABLE `d_classeEleve` (
  `idClasse` int(11) NOT NULL,
  `idEleve` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `d_classeEleve`
--

INSERT INTO `d_classeEleve` (`idClasse`, `idEleve`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(3, 9),
(3, 10),
(4, 11),
(4, 12),
(5, 13),
(5, 14);

-- --------------------------------------------------------

--
-- Structure de la table `d_creator`
--

CREATE TABLE `d_creator` (
  `idCreator` int(8) NOT NULL,
  `nom` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `d_creator`
--

INSERT INTO `d_creator` (`idCreator`, `nom`) VALUES
(1, 'test');

-- --------------------------------------------------------

--
-- Structure de la table `d_demandeAchatGame`
--

CREATE TABLE `d_demandeAchatGame` (
  `idDemande` int(11) NOT NULL,
  `idProf` int(11) NOT NULL,
  `idGame` int(8) NOT NULL,
  `idEcole` int(6) NOT NULL,
  `dateDemande` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `commentaire` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `d_ecole`
--

CREATE TABLE `d_ecole` (
  `id` int(6) NOT NULL,
  `nomEcole` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `d_ecole`
--

INSERT INTO `d_ecole` (`id`, `nomEcole`) VALUES
(1, 'Sainte-Marie: Grand Lebrun'),
(2, 'Epitech');

-- --------------------------------------------------------

--
-- Structure de la table `d_eleves`
--

CREATE TABLE `d_eleves` (
  `idEleve` int(6) NOT NULL,
  `nomEleve` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `prenomEleve` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `BAE` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `INE` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `picPath` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `d_eleves`
--

INSERT INTO `d_eleves` (`idEleve`, `nomEleve`, `prenomEleve`, `BAE`, `INE`, `picPath`) VALUES
(1, 'Merveillau', 'Denis', NULL, NULL, '1-eleve.png'),
(2, 'Senouci', 'Elies', NULL, NULL, 'NULL'),
(3, 'Hesrent', 'François', NULL, NULL, 'NULL'),
(4, 'Bonduelle', 'James', NULL, NULL, 'NULL'),
(5, 'Escrig', 'Yui', NULL, NULL, 'NULL'),
(6, 'Gadrat', 'Diane', NULL, NULL, 'NULL'),
(7, 'Maisonnave', 'florian', NULL, NULL, 'NULL'),
(8, 'Lauque', 'Camille', NULL, NULL, 'NULL'),
(9, 'Rizla', 'Jeanne', NULL, NULL, NULL),
(10, 'Rimbaud', 'Martin', NULL, NULL, NULL),
(11, 'Charbonnier', 'Fanni', NULL, NULL, NULL),
(12, 'Septente', 'Sophie', NULL, NULL, NULL),
(13, 'Bozon', 'Jessica', NULL, NULL, NULL),
(14, 'Couturier', 'Eleonore', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `d_games`
--

CREATE TABLE `d_games` (
  `id` int(8) NOT NULL,
  `idType` int(2) NOT NULL,
  `name` varchar(32) NOT NULL,
  `creator` int(8) NOT NULL,
  `path` varchar(256) DEFAULT NULL,
  `picPath` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `d_games`
--

INSERT INTO `d_games` (`id`, `idType`, `name`, `creator`, `path`, `picPath`) VALUES
(1, 1, 'testApp', 1, 'NULL', '1-app.png');

-- --------------------------------------------------------

--
-- Structure de la table `d_gamesAppEcole`
--

CREATE TABLE `d_gamesAppEcole` (
  `idGame` int(8) NOT NULL,
  `idEcole` int(6) NOT NULL,
  `dateAchat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `d_profsAppClasse`
--

CREATE TABLE `d_profsAppClasse` (
  `idProf` int(11) NOT NULL,
  `idClasse` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `d_profsAppClasse`
--

INSERT INTO `d_profsAppClasse` (`idProf`, `idClasse`) VALUES
(1, 1),
(2, 2),
(1, 3),
(31, 3),
(1, 4),
(30, 4),
(32, 4),
(1, 5),
(30, 5),
(31, 5);

-- --------------------------------------------------------

--
-- Structure de la table `d_profsAppEcole`
--

CREATE TABLE `d_profsAppEcole` (
  `idEcole` int(6) NOT NULL,
  `idProf` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `d_profsAppEcole`
--

INSERT INTO `d_profsAppEcole` (`idEcole`, `idProf`) VALUES
(1, 1),
(1, 2),
(1, 31),
(1, 32),
(1, 33);

-- --------------------------------------------------------

--
-- Structure de la table `d_tableEcole`
--

CREATE TABLE `d_tableEcole` (
  `idTable` int(11) NOT NULL,
  `idEcole` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `d_tableGames`
--

CREATE TABLE `d_tableGames` (
  `idTable` int(8) NOT NULL,
  `idGame` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `d_tableProf`
--

CREATE TABLE `d_tableProf` (
  `tokenTable` varchar(256) NOT NULL,
  `idTable` int(8) NOT NULL,
  `idProf` int(8) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `d_tableProf`
--

INSERT INTO `d_tableProf` (`tokenTable`, `idTable`, `idProf`) VALUES
('035cd16120af6e23e0ff9c5e69f69c90', 1, 0),
('0671c0051dacda0bc83e899e11eaef98', 1, 0),
('068625029e155a92f7e946f2e2855353', 1, 0),
('0beee02ba59fc280550b6409ee27abd5', 1, 0),
('0f4f6a5fe921f8a2b1144bb4e412fd8c', 1, 0),
('0fef8ecd82b0fdd6a9eb5fe432b30d01', 1, 0),
('196f53e72398f77040f72a5806071a9e', 1, 0),
('1be11e84ecac719c466679f380a526f6', 1, 0),
('2054bdbca2d27b127e33ff2971b18555', 1, 0),
('20fb68c132d4a01936ab20f91ef38857', 1, 0),
('23ab76f321a6cecc3ded849b709cea11', 1, 0),
('26f830235b655053006419832db45d09', 1, 0),
('2b6b5bdf9b79833e2817a37cfd16eafd', 1, 0),
('2d192d1b03fe325733fba0ae722ba84b', 1, 0),
('317f72d207b3f423e6f727f1ae7daea5', 1, 0),
('3468a67718478e35ac815fd7fc52c292', 1, 0),
('3a0b5de601b5394f4a2896199aa8e328', 1, 0),
('3dbca60cfc13f665166aeea59aec2b2a', 1, 0),
('3df8e61e330a5d5a9b84f37a9ecea727', 1, 0),
('4c89acede5d8e7d854ade6c86191ea7e', 1, 0),
('4cd91faccf1a04fe54b41dd331d9992b', 1, 0),
('547fba6b0d7e859e2aee3f9848a12dfc', 1, 0),
('5929ab65fddc97203ab100571e23a5dc', 1, 0),
('5a3a768749248bc061f3529a164973bf', 1, 0),
('61887ba12c57d64010120848b24032df', 1, 0),
('62c75b0fbe33225423f6984eb9adfc89', 1, 0),
('64cbff25cba6b6edba594cb519124c3e', 1, 0),
('65e8bd2dd4e39965e67dfd18cbd87553', 1, 0),
('6779bc141c481e59dae1a95658d0af37', 1, 0),
('6c34c514fe8c1fa92aafb42a60f6aec2', 1, 0),
('6d0f70360d6a016ae38068aed8b70414', 1, 0),
('6f141fd1cb9cd48209718aa85d83d8d8', 1, 0),
('705a050cc48aadd6d1d52f04de4bcd4c', 1, 0),
('797d4b435ace1c9bd31e17f0b74401cc', 1, 0),
('7bafd34b808a65269f73b3922573e3d2', 1, 0),
('7d386190b4744fe468c968944dc23bb1', 1, 0),
('7d4aec55b07837813087acc22f2d5634', 1, 0),
('7ddb3a526ff8b5dab3bc5a2a5209970d', 1, 0),
('801135f7d3bcc241234404b7aa5609fa', 1, 0),
('81f7d819b9d1b522b1bad16c1d9bb5f4', 1, 0),
('84410983e4572971969c27b4f53fe4b4', 1, 0),
('873e4522533ee7f6f55591f36d6337d4', 1, 0),
('8976f09bcc11780f472afa1cd2ac5a02', 1, 0),
('8b402630cb9f201bc30c8ad487cad2ea', 1, 0),
('8cfa4096663ff35b9ee25d7459dba525', 1, 0),
('93c1252a4a635f64fbf5f40e6eef4e2c', 1, 0),
('949202c2ba87355f8da25c5cf783ebf8', 1, 0),
('963fb2bec06645c2ce2ee7e70cfa2c44', 1, 0),
('96fedc5ae22e2d26f6d8a4047d462db4', 1, 0),
('99f4e55ff899d8eb981462f027d69d03', 1, 0),
('9fb5d01b93a82f0d1aca4a50c12e4b2f', 1, 0),
('a1ef4bc05e4db4d41f2b01437c515a69', 1, 0),
('a26cd5609275f4769fd1888e90e3fed4', 1, 0),
('a6719331973c7e9a3baa9f3d5f8552ce', 1, 0),
('a6917097f7947e33e9762e2a0c16269f', 1, 0),
('ab54d3fd19d58af7d43f672d8f00be0f', 1, 0),
('adbb7a90697bc1fc59bad39dfeee8e2b', 1, 0),
('af832dec2f248500c47aebaf47e88c24', 1, 0),
('b1b09b01eb85e1f1247b854f5a906450', 1, 0),
('b351d309b85e520f0d1773da3c5fcc6b', 1, 0),
('bc44628de87e67e12ac3a8107d77e6eb', 1, 0),
('c93985d96c51c5356d50afadeed2e7f2', 1, 0),
('d0970551f675ab0ebbc1279d1236e5a7', 1, 0),
('d2d5281090ad3bdf1079f8fcf89f7c4c', 1, 0),
('d4fdd064b54a51ef742b918f6dde29d1', 1, 0),
('e522aed42af0d1bb9cbf9707c673a97c', 1, 0),
('e6fbb6a0251755e4a884bb56e2bc6170', 1, 0),
('e8515010d51be689ece1deec5698d9c4', 1, 0),
('ea95ebf7abab949102beebf53b08fc50', 1, 0),
('ec64e3cbaeb4101e75040c9c5926ee44', 1, 0),
('ed1bd173b0b96daac47bf1172c02decf', 1, 0),
('ed8c7fff0cf8dc6aba26015f6005cdb3', 1, 0),
('effa9fa396f21f366eb5e68e9df84baf', 1, 0),
('f00857cc9d48f8e65797afbf8f191f0e', 1, 0),
('f58f8ba021d7d3c5138d979405692cb4', 1, 0),
('f75c5f47401685e893941746726fb25e', 1, 0),
('f94917c93ddda9303c7459dbb2c7e4fc', 1, 0),
('f9eaeb1e0705e4bf9c303f009b2c8182', 1, 0),
('fbb958df0426d713458f6bf0e4f76e2a', 1, 0),
('ff734ba96abfcc2c5fc6e9ea14bde4e2', 1, 0),
('101400fdc9c29a4ce5dcba9c9e1d9ae7', 1, 1),
('21f5480d2f113d18dc05aabdc5b6a75b', 1, 1),
('275207e2a25c45094a00c5c9921d320c', 1, 1),
('28b8512ed5cbbf11aeb1e1ceea3c18a0', 1, 1),
('3ecd595f63fa7fcb3d9a4a9242cc2341', 1, 1),
('4016cbd9aa7627952e28196a9f91cf54', 1, 1),
('4724ef24922528dfa70cf786b72b126b', 1, 1),
('5203f46b8f4a453ca315e76a6a7b3600', 1, 1),
('5bd4a1f591cec621475de201236004a0', 1, 1),
('647e16fc4e2af69f4f59be0041e8e680', 1, 1),
('79af0199bd7a24cbd260d11458074974', 1, 1),
('80ad583e1fb3eb2d36f486dec2336bd9', 1, 1),
('855b71ee52f97680601b1f9821ace9e3', 1, 1),
('8c165df67141fc8a13e86e2834125b07', 1, 1),
('975c631bdca09ca3104625d4ce7ea728', 1, 1),
('9f47ec104e42cf63a8bcb66a086d77fe', 1, 1),
('ab8a3312a5121cef0cf01805138a41df', 1, 1),
('bf699056102299d983548ca8b307135a', 1, 1),
('d0ef0127192f52f7f063cd5b8001b2d9', 1, 1),
('e0fb2f6f6e39983e631efdd353adac93', 1, 1),
('e1881d0b12d2dc69ef01eec9e056cdfa', 1, 1),
('e3a1ff71e4054a3a3fdff7cb2548debd', 1, 1),
('e3dda8c7681013533fe029888697fea6', 1, 1),
('ef3cd071c284fcbb238cdc4776e4f435', 1, 1),
('fdfd4d70a1ee287f57dce2f1d19bfdc2', 1, 1),
('fec96e38773b2a4f0dc60f4be405034f', 1, 1),
('17d5210b8acb13531d4f76951f79161c', 1, 28),
('198361a127dfaafe4a38d12e886f4d10', 1, 28),
('1e97c7c64cc2f0aa0b33fa4d88e54f3b', 1, 28),
('1f2c5cb5ac33d8b6942820509d257234', 1, 28),
('33fd8bb1390061aad89e2aed47a19cd0', 1, 28),
('346240d44b4e8c2feb2e356463076994', 1, 28),
('4060647c6a5aa76ed5dea778b3d6f6ae', 1, 28),
('45a4ecac7961cd3b81e9e59494f8d908', 1, 28),
('606b8de14686854c94a2555d1a60c014', 1, 28),
('70928ac3b2a80bfd10c170b20b3f9cdb', 1, 28),
('7509b6ce3ba7f316b9d716cc38a1f203', 1, 28),
('76185256cf994c9236e7f5306666af42', 1, 28),
('877c895d5494c4ba1f3b1026a7e102bf', 1, 28),
('8ca99d7a967c2ae3d6d87fe372625ff3', 1, 28),
('92b66cec3b2c2781e4051db333b35eda', 1, 28),
('959343bbb3a8cb9eb3d0baeacea360ae', 1, 28),
('97f4e13a693fc29826dad068ef4c260f', 1, 28),
('9a75be44dd480f2f780e4b6fc5502a3e', 1, 28),
('a4e70eb1b4230a7430e3e377bc1a6586', 1, 28),
('a706a04feca67ea44d0d7b35b194d08d', 1, 28),
('a82a66eb2494b42a485d0fd2505c66ef', 1, 28),
('b8e134229b005e725ef7066e4a952711', 1, 28),
('c6307f4fcd0c711cbe2dede46e7d41d5', 1, 28),
('c7d75111f7566803a197bd6dbd3db9f2', 1, 28),
('e08fd5f131f306c001bf00393b416a52', 1, 28);

-- --------------------------------------------------------

--
-- Structure de la table `d_tables`
--

CREATE TABLE `d_tables` (
  `idTable` int(8) NOT NULL,
  `nomTable` varchar(32) NOT NULL,
  `access_token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `d_tables`
--

INSERT INTO `d_tables` (`idTable`, `nomTable`, `access_token`) VALUES
(1, 'Dune 1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDI5ODY0NzYsImV4cCI6MTg1ODM0NjQ3Nn0.1-AzcidDuMfnI9c36ZX2Kp_SpU0fwwh1AtX2LNkALQk'),
(124, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDI5MTA3OTQsImV4cCI6MTg1ODI3MDc5NH0.GZ0k6LMucrpAeuTa2ILYAfsJMYPCdbJWZacXojYPWdE'),
(125, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDI5MTA4NzEsImV4cCI6MTg1ODI3MDg3MX0.err1vPbarDvaD8c93x-OzOBoCjhDIe3uccVfOmKVaqk'),
(126, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDI5MTEzMDcsImV4cCI6MTg1ODI3MTMwN30.hZ9tNFYWVHp1kozmOX7lVm9LX2j58HmIB7Uj8zmcjyc'),
(127, 'Gadrat', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkdhZHJhdCIsImlhdCI6MTU0Mjk4NjEwMCwiZXhwIjoxODU4MzQ2MTAwfQ.hDjjvaNVmpU8EL7QRdmtJs5I3Zmk5Sh2xmHfqxbw-JI'),
(129, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDM1OTYwMzEsImV4cCI6MTg1ODk1NjAzMX0.zEnh6159J1_cgmVqDzPHp5lKIfJTf5VpJPaBgfbFa4s'),
(130, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDM2ODQxMzQsImV4cCI6MTg1OTA0NDEzNH0.fjLiJ6sVHjWWWkBnh0t1XFq_0y3ypNQCzquLGY65oUg'),
(131, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDM3NzA5MTMsImV4cCI6MTg1OTEzMDkxM30.9qQixW4newDPDKxDmEc7TBXDj7jeQV1dxRCqtcOKmHs'),
(132, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDM5MTE4MTEsImV4cCI6MTg1OTI3MTgxMX0.swHRKgbE1QewZElnmR8QRwoNy93H-UZl-N5jGH3RK0c'),
(133, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQwMjc5MzIsImV4cCI6MTg1OTM4NzkzMn0.4oC9IfFpMR5UnW14oM2ceOaL2PGP8XA_BgL7dVgAIoc'),
(134, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQwMjc5NzEsImV4cCI6MTg1OTM4Nzk3MX0.xAICQC9LYYEuZe6uA_ooHBeaDuvG96OsEQ6Vbs8WOoI'),
(135, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQwMjkwNTIsImV4cCI6MTg1OTM4OTA1Mn0.H6d_suNMqIu-qhqqyJA83-Kod6OyOr6smPvaC8g8luI'),
(136, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQxMDc1MjAsImV4cCI6MTg1OTQ2NzUyMH0.JTxjm1875eHLJkyr0pfKdLCx34EMcjbEUARtfOWI0H0'),
(137, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQxMDk3NDYsImV4cCI6MTg1OTQ2OTc0Nn0.Uzterh95LvCL_BGliIEajHJlKLZSAppRkzdEOMZqodg'),
(138, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQxMDk5MzgsImV4cCI6MTg1OTQ2OTkzOH0.zKPYJjIuuMCSJQk2Mmnse8YZDMp4p-012JZFRu8whzc'),
(139, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQxMTAxODAsImV4cCI6MTg1OTQ3MDE4MH0.w6y_dOMe6kxkcKb_lzSm9V0zGi4WffOrKUHDhpgn_JQ'),
(140, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTUzNjUsImV4cCI6MTg1OTc1NTM2NX0.vFSQ_8EBZ-SGeXMsWZxwLDRkYveyyqJYmYdaCS0MQCc'),
(141, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTU0NDEsImV4cCI6MTg1OTc1NTQ0MX0.2EKQslFcUmvs5tDAn_tbtOSOzmZFcKHKUKuhhp8fuyQ'),
(142, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTU2ODIsImV4cCI6MTg1OTc1NTY4Mn0.qenou_roFLjRPn_MEt5iysrkmRXW7n9pbp0EfnuWcRc'),
(143, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTU3MTYsImV4cCI6MTg1OTc1NTcxNn0.V2qOpvg49DwEw7BZck3LGfU6Oam7tgY2H0tWjIJqnXE'),
(144, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTU3NDAsImV4cCI6MTg1OTc1NTc0MH0.sN5IBAqkOEllaBbJh4JhStECpvZFNaDb-PxBvkRuUdk'),
(145, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTU5MTcsImV4cCI6MTg1OTc1NTkxN30.u6xFzyNHxCzPeHqjoey8_CfQ4XN7DdKoY07lhHxK8QM'),
(146, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTU5NjIsImV4cCI6MTg1OTc1NTk2Mn0.mh2kCkr4SK1GeI93ALuD694strWbpc408NBA_NDdHeo'),
(147, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTYwNTQsImV4cCI6MTg1OTc1NjA1NH0.z5nA_Ie_fufTb6KhkInwy3H4HfM4YP-CpKGU0E4no1s'),
(148, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTYxNDAsImV4cCI6MTg1OTc1NjE0MH0.b-YM7phngjhzGaoXJGQav6mmWfT0qIW_neD3aAoEeqQ'),
(149, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTYxOTEsImV4cCI6MTg1OTc1NjE5MX0.lVxrSm_S9JsAs1QCDxObOrqTT3qOW4Yp91yMIzi1pu4'),
(150, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTYyMzQsImV4cCI6MTg1OTc1NjIzNH0.D1xQIljzpcg-YEjfmEKpagHw5sE8i71KNeDyJNbVTVM'),
(151, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTY1OTgsImV4cCI6MTg1OTc1NjU5OH0.qX7pBKLASBXQq95LVpZKxd_pjmG6nlCSQEtRSEYKm_k'),
(152, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTcwMzYsImV4cCI6MTg1OTc1NzAzNn0.vldVe0cZ71EnVtXUMxw21rS8DXWBbkUvL7YN9ZStZa8'),
(153, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTcwNzEsImV4cCI6MTg1OTc1NzA3MX0.QMem72tZu4ht8EIkUjdPmddcG7LUakpVYuI_1DFfjRc'),
(154, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTcwODYsImV4cCI6MTg1OTc1NzA4Nn0.ocZObm9GS85IlkgNh4umxPmrscXZbpC_ejSl5-MJRNo'),
(155, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTcxMjEsImV4cCI6MTg1OTc1NzEyMX0.un2DtG9AJJKN6Am95J5omQikCIX8-xtuW31u6w9Flvc'),
(156, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTcxMzksImV4cCI6MTg1OTc1NzEzOX0.AVAam9lvHVDvO6Nt2yfW-vDlJdNgZSpm_Ir_Kw2KMCk'),
(157, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTcxODAsImV4cCI6MTg1OTc1NzE4MH0.0RErVbXxlz-YY2Z3sNCxAwNnzHF0Zdg-AFALjrUjhWE'),
(158, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTcxOTQsImV4cCI6MTg1OTc1NzE5NH0.UhB0-wJV2o3jSVsCd6dkcYch3csAqamlNJnsCPgj8es'),
(159, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTcyNzQsImV4cCI6MTg1OTc1NzI3NH0.wBRMjMQRbrgLXIZsnp3uqYHGNtqRL8SMd1zF37UKAaU'),
(160, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQzOTczNzIsImV4cCI6MTg1OTc1NzM3Mn0.T-Wi9NuMgrPgrxWDJwv5Fmx7aPXVu7156AwWMKzLXOI'),
(161, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMDM3OSwiZXhwIjoxODU5NzYwMzc5fQ.8ohyNeL4fnOOWZ42weXB8QFHHku6PbiEj-s9Bf93cWc'),
(162, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMDQ2MSwiZXhwIjoxODU5NzYwNDYxfQ.4wEAtB8v5UFX9OFV8zj7Ojqe6EG24d_4hUqcu9c2aMc'),
(163, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMDQ4OSwiZXhwIjoxODU5NzYwNDg5fQ.sgAEi0A5JUvNg_wCxlZ4rV59awBRg28_v922vYECd7k'),
(164, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMTEzMSwiZXhwIjoxODU5NzYxMTMxfQ.ChDsWuH7xe40kQFSY7vs8boNZ451yb4PqcwqdvGB7U4'),
(165, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMTIzMiwiZXhwIjoxODU5NzYxMjMyfQ.K3e4G6eDlz8aUin2aHupwrNdt_1oC1wguMxeHVQUmFU'),
(166, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMjM2MywiZXhwIjoxODU5NzYyMzYzfQ.HQZU8ynoOigQ_tAU_VTugdvJ-ycp6h4E08wpivt3EPg'),
(167, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMjU1NiwiZXhwIjoxODU5NzYyNTU2fQ.aiJinpCmC3MlR_YlciCeF-TLKNvIWZW1WOoBureAUaU'),
(168, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMjcxOCwiZXhwIjoxODU5NzYyNzE4fQ.brLRA8Lq1ryh7lToFDFoC1feqOR79C3d5Q3M1J06amI'),
(169, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMjgyMywiZXhwIjoxODU5NzYyODIzfQ.aCDUOZtIfks478py67UvuDNZR-Rzuid_iVzAfTQWMZ4'),
(170, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMjkwOCwiZXhwIjoxODU5NzYyOTA4fQ.WZW0WPONwsvxmKzw0QlYH7GVYUkUx0WdJP-hMx312aw'),
(171, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMzEyMywiZXhwIjoxODU5NzYzMTIzfQ.IJBpkEErZB7JRKb1Wo38816bxbS-mEnT-5WzfMzS1XI'),
(172, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMzE1NSwiZXhwIjoxODU5NzYzMTU1fQ.RbMMmcRqTEvqde3uouelYyDJk8Ln6fL34xtpmxZ39_M'),
(173, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMzMzMCwiZXhwIjoxODU5NzYzMzMwfQ.ssSRNEXPh0CnVEXZo3goD4Z60YOdRg3tTdrJ7GLC2No'),
(174, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMzQ1NywiZXhwIjoxODU5NzYzNDU3fQ.j11lf_LgcylvfbVf8bN-C47592X38Lo48ytohaTTMW0'),
(175, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQwMzYzNiwiZXhwIjoxODU5NzYzNjM2fQ.qXtYrXiyubZDHzIv-kRZMGPAFayQxq0MQeYN2Fcuazk'),
(176, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQxODE4MSwiZXhwIjoxODU5Nzc4MTgxfQ.I21QBCWF0fNaowSbjjO6Fb4CjXK85kU9lquCOPSwf7A'),
(177, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQxOTU0NiwiZXhwIjoxODU5Nzc5NTQ2fQ.ljcg-PydL9fy3LP8Ka3X9ivukKPNgjNmZjFv7kmTBEo'),
(178, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQyMzY4NiwiZXhwIjoxODU5NzgzNjg2fQ.5fNf5fOz4ovN-SH74wKB2XhGhXvq_FNUee2ZcVv6fQY'),
(179, 'tmp', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRtcCIsInBlcm0iOjQsImlhdCI6MTU0NDQyNzM0NSwiZXhwIjoxODU5Nzg3MzQ1fQ.t5U9ZDC_gChmoaqYWT0J643fscYV4iGLbvLkoMiq4e0'),
(180, 'NomCeQueJeVeux', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik5vbUNlUXVlSmVWZXV4IiwicGVybSI6NCwiaWF0IjoxNTQ0NDQyMzI4LCJleHAiOjE4NTk4MDIzMjh9.qlGJnc3V1NekC4lVzW3mWTgWTEmd8o-3dEeDo4m1wL4'),
(181, 'NomCeQueJeVeux', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik5vbUNlUXVlSmVWZXV4IiwicGVybSI6NCwiaWF0IjoxNTQ0NDQyNDMyLCJleHAiOjE4NTk4MDI0MzJ9.YlnE23Ky49aT7fj-yrZfaV8LhkztPRBnvBCoXKJ8gQU'),
(182, 'undefined', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtIjo0LCJpYXQiOjE1NDQ0NTgwNDAsImV4cCI6MTg1OTgxODA0MH0.-xC9WF5P7ErCD0KnLxOKVslBQt0vbsKLWoIgUOyHisU');

-- --------------------------------------------------------

--
-- Structure de la table `d_typeGames`
--

CREATE TABLE `d_typeGames` (
  `idType` int(2) NOT NULL,
  `labelType` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `d_typeGames`
--

INSERT INTO `d_typeGames` (`idType`, `labelType`) VALUES
(1, 'Jeux');

-- --------------------------------------------------------

--
-- Structure de la table `d_users`
--

CREATE TABLE `d_users` (
  `idUser` int(11) NOT NULL,
  `nomUser` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `prenomUser` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `emailUser` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `typeUser` int(11) NOT NULL DEFAULT '1',
  `picPath` text COLLATE utf8_unicode_ci,
  `access_token` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `device_type` enum('ios','android','web') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `d_users`
--

INSERT INTO `d_users` (`idUser`, `nomUser`, `prenomUser`, `emailUser`, `pass`, `typeUser`, `picPath`, `access_token`, `device_type`) VALUES
(0, 'blank', 'blank', 'blank@blank.com', '04b2c7d23cdd19843241b20b331992a7', 3, NULL, 'n/a', 'web'),
(1, 'Berthaud', 'Elodie', 'elodie.berthaud1@gmail.com', '94eac12f1a5c6608dea2686dfce4db2d', 2, '1-prof.png', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0ODg1OTMxLCJleHAiOjE1NDU0OTA3MzF9.R19ji4jxLVPxdhyHtK_4A_zhdR6_4-8i6fwX_g34_IQ', 'ios'),
(2, 'gadrat', 'Romain', 'romain.gasdrat@epitech.eu', '04b2c7d23cdd19843241b20b331992a7', 1, '2-prof.png', '', 'ios'),
(3, 'Guichard', 'Thomas', 'test', '68740c58ded05848cf7427780d285a1b', 1, NULL, '', 'web'),
(19, 'gadrat', 'Romain', 'romain.gadrat@epitech.eu', '6ffc0db492c94d57500c9ff9eb458a09', 1, NULL, 'n/a', 'web'),
(20, 'Francois', 'undefined', 'francois.hersent@epitech.eu', '3c90261b45b9c35d71bdd1d329c6a2dc', 1, NULL, 'n/a', 'web'),
(21, 'test', 'test', 'rrrrrr@gggggggg.com', '646da113632c0d08913d9e62b924ed03', 1, NULL, 'n/a', 'web'),
(22, 'Ropied', 'Ongle', 'maisonnave.florian@gmail.com', '615435b1eeff15516e127029050dcf1c', 1, NULL, 'n/a', 'web'),
(24, 'fwefwe', 'fwegfew', 'fewfew@fwef.com', 'c9b0653a3a623e5f379d6dd3ce52ee8a', 1, NULL, 'n/a', 'web'),
(25, 'Maxence', 'Lauque', 'maxence.lauque@epitech.eu', '6ab36f83c823a0dcd2519e5bbf17f438', 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTU0NDU0OTczNiwiZXhwIjoxNTQ1MTU0NTM2fQ.MYFzJcUAYY-tmHhgY9QZhcphd3MnV6PTWsS_V0K2u5o', 'web'),
(26, 'SAINT-JUST', 'Guillaume', 'guillaume.saint-just@epitech.eu', '0d280daf5a885a7207bfa93455fd6b13', 1, NULL, 'n/a', 'web'),
(27, 'Lauque', 'Max', 'maxencelauque@gmail.com', '6ab36f83c823a0dcd2519e5bbf17f438', 2, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTU0NDAyNzM4MywiZXhwIjoxNTQ0NjMyMTgzfQ.mLFAIMijQfe1NvDyRJ8e_YZ4UmwW84A3HyEtNs7KmiI', 'android'),
(28, 'Rimbaud', 'Martin', 'm.rimbaud@hotmail.fr', '32ea46d1b2ab426ce2982c748eeb25b3', 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTU0NDg4NTg3MSwiZXhwIjoxNTQ1NDkwNjcxfQ.Ymj0VEYLGEN7K5rLoyGtr7FZhf3PsED629cM_JaAbP8', 'web'),
(29, 'ffffff', 'fewfew', 'fewfewfew@fwfe.com', 'c7b28e35df9e7afe21967a124f1acab8', 1, NULL, 'n/a', 'web'),
(30, 'Berthaud', 'Elodie', 'elodie.berthaud@epitech.eu', 'aad202fdcbacdae5821a002c2959328e', 1, '30-prof.png', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImlhdCI6MTU0NDQ1NzUyNiwiZXhwIjoxNTQ1MDYyMzI2fQ.IiYMCdAooGivgUXmN4iTQ_ifhhvgm8vyQCoOOkLXTqg', 'web'),
(31, 'Fourcade', 'Lauriane', 'lauriane.fourcade@smgl.fr', 'f02368945726d5fc2a14eb576f7276c0', 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImlhdCI6MTU0NDM3NTY0MSwiZXhwIjoxNTQ0OTgwNDQxfQ.4zXIdhqxjNMlDvG4XHYuppUwzUc0_hgoBcyW73O3iWQ', 'android'),
(32, 'Edison', 'Paolo', 'paolo.edison@smgl.fr', 'f02368945726d5fc2a14eb576f7276c0', 1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImlhdCI6MTU0NDExODUwNCwiZXhwIjoxNTQ0NzIzMzA0fQ.hezuP2PyLKvIlS9DEyGVB5XLTPloLKxBn2r8IQ1seaU', 'android'),
(33, 'Lalouet', 'Baptiste', 'baptiste.lalouet@smgl.fr', 'f02368945726d5fc2a14eb576f7276c0', 2, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInBlcm0iOjIsImlhdCI6MTU0NDg5MDIwMiwiZXhwIjoxNTQ1NDk1MDAyfQ.rbmQFtOXYYHTQIQDnjMdUyYgaOVyuWaSlI5hlhANe3g', 'web');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `access_token`
--
ALTER TABLE `access_token`
  ADD PRIMARY KEY (`access_token_id`),
  ADD KEY `fk_access_token_1_idx` (`user_id`);

--
-- Index pour la table `d_classe`
--
ALTER TABLE `d_classe`
  ADD PRIMARY KEY (`idClasse`);

--
-- Index pour la table `d_classeEcole`
--
ALTER TABLE `d_classeEcole`
  ADD PRIMARY KEY (`idClasse`,`idEcole`),
  ADD KEY `idEcole` (`idEcole`);

--
-- Index pour la table `d_classeEleve`
--
ALTER TABLE `d_classeEleve`
  ADD PRIMARY KEY (`idClasse`,`idEleve`),
  ADD KEY `idEleve` (`idEleve`);

--
-- Index pour la table `d_creator`
--
ALTER TABLE `d_creator`
  ADD PRIMARY KEY (`idCreator`);

--
-- Index pour la table `d_demandeAchatGame`
--
ALTER TABLE `d_demandeAchatGame`
  ADD PRIMARY KEY (`idDemande`) USING BTREE,
  ADD KEY `idProf` (`idProf`),
  ADD KEY `idGame` (`idGame`),
  ADD KEY `idEcole` (`idEcole`);

--
-- Index pour la table `d_ecole`
--
ALTER TABLE `d_ecole`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `d_eleves`
--
ALTER TABLE `d_eleves`
  ADD PRIMARY KEY (`idEleve`);

--
-- Index pour la table `d_games`
--
ALTER TABLE `d_games`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creator` (`creator`),
  ADD KEY `idType` (`idType`) USING BTREE;

--
-- Index pour la table `d_gamesAppEcole`
--
ALTER TABLE `d_gamesAppEcole`
  ADD PRIMARY KEY (`idGame`,`idEcole`),
  ADD KEY `idEcole` (`idEcole`);

--
-- Index pour la table `d_profsAppClasse`
--
ALTER TABLE `d_profsAppClasse`
  ADD PRIMARY KEY (`idProf`,`idClasse`),
  ADD KEY `idClasse` (`idClasse`);

--
-- Index pour la table `d_profsAppEcole`
--
ALTER TABLE `d_profsAppEcole`
  ADD PRIMARY KEY (`idEcole`,`idProf`),
  ADD KEY `idProf` (`idProf`);

--
-- Index pour la table `d_tableEcole`
--
ALTER TABLE `d_tableEcole`
  ADD PRIMARY KEY (`idTable`,`idEcole`),
  ADD KEY `idEcole` (`idEcole`);

--
-- Index pour la table `d_tableGames`
--
ALTER TABLE `d_tableGames`
  ADD PRIMARY KEY (`idTable`,`idGame`),
  ADD KEY `idGame` (`idGame`);

--
-- Index pour la table `d_tableProf`
--
ALTER TABLE `d_tableProf`
  ADD PRIMARY KEY (`tokenTable`,`idTable`),
  ADD KEY `idTable` (`idTable`),
  ADD KEY `idProf` (`idProf`);

--
-- Index pour la table `d_tables`
--
ALTER TABLE `d_tables`
  ADD PRIMARY KEY (`idTable`);

--
-- Index pour la table `d_typeGames`
--
ALTER TABLE `d_typeGames`
  ADD PRIMARY KEY (`idType`);

--
-- Index pour la table `d_users`
--
ALTER TABLE `d_users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `access_token`
--
ALTER TABLE `access_token`
  MODIFY `access_token_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;
--
-- AUTO_INCREMENT pour la table `d_classe`
--
ALTER TABLE `d_classe`
  MODIFY `idClasse` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `d_creator`
--
ALTER TABLE `d_creator`
  MODIFY `idCreator` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `d_demandeAchatGame`
--
ALTER TABLE `d_demandeAchatGame`
  MODIFY `idDemande` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `d_ecole`
--
ALTER TABLE `d_ecole`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `d_eleves`
--
ALTER TABLE `d_eleves`
  MODIFY `idEleve` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT pour la table `d_tables`
--
ALTER TABLE `d_tables`
  MODIFY `idTable` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=183;
--
-- AUTO_INCREMENT pour la table `d_typeGames`
--
ALTER TABLE `d_typeGames`
  MODIFY `idType` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `d_users`
--
ALTER TABLE `d_users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `access_token`
--
ALTER TABLE `access_token`
  ADD CONSTRAINT `fk_access_token_1` FOREIGN KEY (`user_id`) REFERENCES `d_users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `d_classeEcole`
--
ALTER TABLE `d_classeEcole`
  ADD CONSTRAINT `d_classeEcole_ibfk_1` FOREIGN KEY (`idEcole`) REFERENCES `d_profsAppEcole` (`idEcole`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_classeEcole_ibfk_2` FOREIGN KEY (`idClasse`) REFERENCES `d_classe` (`idClasse`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `d_classeEleve`
--
ALTER TABLE `d_classeEleve`
  ADD CONSTRAINT `d_classeEleve_ibfk_1` FOREIGN KEY (`idEleve`) REFERENCES `d_eleves` (`idEleve`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_classeEleve_ibfk_2` FOREIGN KEY (`idClasse`) REFERENCES `d_classe` (`idClasse`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `d_demandeAchatGame`
--
ALTER TABLE `d_demandeAchatGame`
  ADD CONSTRAINT `d_demandeAchatGame_ibfk_1` FOREIGN KEY (`idProf`) REFERENCES `d_users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_demandeAchatGame_ibfk_2` FOREIGN KEY (`idGame`) REFERENCES `d_games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_demandeAchatGame_ibfk_3` FOREIGN KEY (`idEcole`) REFERENCES `d_ecole` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `d_games`
--
ALTER TABLE `d_games`
  ADD CONSTRAINT `d_games_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `d_creator` (`idCreator`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_games_ibfk_2` FOREIGN KEY (`idType`) REFERENCES `d_typeGames` (`idType`);

--
-- Contraintes pour la table `d_gamesAppEcole`
--
ALTER TABLE `d_gamesAppEcole`
  ADD CONSTRAINT `d_gamesAppEcole_ibfk_1` FOREIGN KEY (`idEcole`) REFERENCES `d_ecole` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_gamesAppEcole_ibfk_2` FOREIGN KEY (`idGame`) REFERENCES `d_games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `d_profsAppClasse`
--
ALTER TABLE `d_profsAppClasse`
  ADD CONSTRAINT `d_profsAppClasse_ibfk_2` FOREIGN KEY (`idProf`) REFERENCES `d_users` (`idUser`),
  ADD CONSTRAINT `d_profsAppClasse_ibfk_3` FOREIGN KEY (`idClasse`) REFERENCES `d_classe` (`idClasse`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `d_profsAppEcole`
--
ALTER TABLE `d_profsAppEcole`
  ADD CONSTRAINT `d_profsAppEcole_ibfk_1` FOREIGN KEY (`idProf`) REFERENCES `d_users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_profsAppEcole_ibfk_2` FOREIGN KEY (`idEcole`) REFERENCES `d_ecole` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `d_tableEcole`
--
ALTER TABLE `d_tableEcole`
  ADD CONSTRAINT `d_tableEcole_ibfk_2` FOREIGN KEY (`idEcole`) REFERENCES `d_ecole` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_tableEcole_ibfk_3` FOREIGN KEY (`idTable`) REFERENCES `d_tables` (`idTable`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `d_tableGames`
--
ALTER TABLE `d_tableGames`
  ADD CONSTRAINT `d_tableGames_ibfk_1` FOREIGN KEY (`idGame`) REFERENCES `d_games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_tableGames_ibfk_2` FOREIGN KEY (`idTable`) REFERENCES `d_tables` (`idTable`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `d_tableProf`
--
ALTER TABLE `d_tableProf`
  ADD CONSTRAINT `d_tableProf_ibfk_3` FOREIGN KEY (`idTable`) REFERENCES `d_tables` (`idTable`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `d_tableProf_ibfk_4` FOREIGN KEY (`idProf`) REFERENCES `d_users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
