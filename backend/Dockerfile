FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
RUN npm ci

COPY . .

EXPOSE 3333

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run dev"]
