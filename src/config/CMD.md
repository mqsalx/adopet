mysql -u root -p

CREATE USER 'urUser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'urPassword';

GRANT ALL PRIVILEGES ON urDBname.* TO 'urUser'@'localhost';