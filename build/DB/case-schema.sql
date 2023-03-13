CREATE DATABASE IF NOT EXISTS `timeline`;


DROP USER 'timeline_admin'@'%';
-- password MD5('surveys_admin')
CREATE USER 'timeline_admin'@'%' IDENTIFIED WITH mysql_native_password BY '34d5c41a0f42a45ee55e696fe76aef5d';
GRANT ALL ON timeline.* TO 'timeline_admin'@'%';
FLUSH PRIVILEGES;