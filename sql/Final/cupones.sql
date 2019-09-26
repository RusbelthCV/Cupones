-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-09-2019 a las 01:46:54
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cupones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cupones`
--

CREATE TABLE `cupones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `caducidad` date NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `foto` varchar(45) DEFAULT NULL,
  `valor` int(11) NOT NULL,
  `enVenta` tinyint(4) DEFAULT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `usuario` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiquetas`
--

CREATE TABLE `etiquetas` (
  `id` int(11) NOT NULL,
  `Nombre_categoria` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `Cupones_id` int(11) NOT NULL,
  `Usuario_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(20) DEFAULT NULL,
  `idusuari` varchar(36) DEFAULT NULL,
  `nomusuari` varchar(100) DEFAULT NULL,
  `admin` tinyint(4) DEFAULT 0,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `_uuid` varchar(36) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `nacimiento` date NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `admin` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vendidos`
--

CREATE TABLE `vendidos` (
  `Cupones_id` int(11) NOT NULL,
  `Etiquetas_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cupones`
--
ALTER TABLE `cupones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`Cupones_id`,`Usuario_id`),
  ADD KEY `fk_Cupones_has_Usuario_Usuario1_idx` (`Usuario_id`),
  ADD KEY `fk_Cupones_has_Usuario_Cupones1_idx` (`Cupones_id`);

--
-- Indices de la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`_uuid`);

--
-- Indices de la tabla `vendidos`
--
ALTER TABLE `vendidos`
  ADD PRIMARY KEY (`Cupones_id`,`Etiquetas_id`),
  ADD KEY `fk_Cupones_has_Etiquetas_Etiquetas1_idx` (`Etiquetas_id`),
  ADD KEY `fk_Cupones_has_Etiquetas_Cupones1_idx` (`Cupones_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cupones`
--
ALTER TABLE `cupones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `registro`
--
ALTER TABLE `registro`
  ADD CONSTRAINT `fk_Cupones_has_Usuario_Cupones1` FOREIGN KEY (`Cupones_id`) REFERENCES `cupones` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Cupones_has_Usuario_Usuario1` FOREIGN KEY (`Usuario_id`) REFERENCES `usuario` (`_uuid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vendidos`
--
ALTER TABLE `vendidos`
  ADD CONSTRAINT `fk_Cupones_has_Etiquetas_Cupones1` FOREIGN KEY (`Cupones_id`) REFERENCES `cupones` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Cupones_has_Etiquetas_Etiquetas1` FOREIGN KEY (`Etiquetas_id`) REFERENCES `etiquetas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
