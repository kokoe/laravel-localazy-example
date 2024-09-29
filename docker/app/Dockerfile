# ベースイメージとしてPHP-FPMを使用
FROM php:8.1-fpm

# Node.jsとnpmをインストール
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get update \
    && apt-get install -y \
    nodejs \
    git \
    zip \
    unzip \
    php-zip

    # Composerをインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 作業ディレクトリを設定
WORKDIR /var/www

# 必要なPHP拡張モジュールのインストール
RUN docker-php-ext-install pdo_mysql

# Localazy CLIをインストール
RUN npm install -g @localazy/cli

# ローカル用のPHP設定ファイルを追加
COPY ./docker/php/local.ini /usr/local/etc/php/conf.d/
