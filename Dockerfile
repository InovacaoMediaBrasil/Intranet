FROM php:8.5-rc-apache

RUN a2enmod rewrite

COPY ./Src /var/www/html/
