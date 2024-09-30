# Laravel + Localazy example

https://localazy.com/

## Localazy CLI

https://localazy.com/docs/cli/the-basics

### Command-Line Options

https://localazy.com/docs/cli/command-line-options

# Setup

`env.example` から `.env` を作成して、必要箇所を編集。

```bash
cp .env.example .env
```

`localazy.example.json` から `localazy.json` を作成して、必要箇所を編集。

```bash
cp localazy.example.json　localazy.json
```

Docker 起動、npm i を実行

```bash
docker-compose up -d

docker-compose run app npm i
```

# 翻訳ファイルの Download

```bash
docker-compose run app npm run localazy:download
```
