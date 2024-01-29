FROM nikolaik/python-nodejs:python3.12-nodejs18 as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx
COPY --from=builder /app/storybook-static /usr/share/nginx/html
