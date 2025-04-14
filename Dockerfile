FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

COPY pg-availability-check.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/pg-availability-check.sh

ENTRYPOINT ["pg-availability-check.sh"]
CMD ["pnpm", "start:prod"] 