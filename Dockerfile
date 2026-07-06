FROM php:8.6-rc-apache

RUN a2enmod rewrite

COPY ./Src /var/www/html/
