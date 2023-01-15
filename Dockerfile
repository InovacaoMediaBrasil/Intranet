FROM php:8.2-rc-zts

RUN a2enmod rewrite

COPY ./ /var/www/html/