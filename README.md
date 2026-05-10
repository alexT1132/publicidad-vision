# Publicidad con Vision

Landing en Next.js 16 para el sitio de Publicidad con Vision.

## Desarrollo local

```bash
npm install
npm run dev
```

## Deploy con Docker Compose

Este proyecto ya esta preparado para correr en produccion con `Next.js standalone`.

Primera vez en el servidor:

```bash
git clone <TU-REPO> publicidad-con-vision
cd publicidad-con-vision
cp .env.example .env
# edita .env y coloca tu ANTHROPIC_API_KEY real
sudo docker compose up -d
```

Actualizacion normal:

```bash
git pull
sudo docker compose down
sudo docker compose up -d
```

`docker-compose.yml` usa `pull_policy: build` para que `docker compose up` reconstruya la imagen con el codigo recien actualizado. Si tu servidor tiene una version vieja de Docker Compose y no respeta esa opcion, usa:

```bash
sudo docker compose up -d --build
```

La app queda expuesta en el puerto `3000`.

Variables de entorno esperadas en `.env`:

```bash
ANTHROPIC_API_KEY=tu_api_key_real
ANTHROPIC_MODEL=claude-sonnet-4-20250514
```

## Pasar el repo a tu GitHub

Si quieres que este proyecto apunte a un repositorio tuyo en vez del original:

1. Crea un repositorio nuevo y vacio en tu cuenta de GitHub.
2. Cambia el remoto local:

```bash
git remote rename origin upstream
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git remote -v
```

3. Sube la rama actual:

```bash
git push -u origin master
```

Asi conservas el repo original como `upstream` y tu repo nuevo como `origin`.
