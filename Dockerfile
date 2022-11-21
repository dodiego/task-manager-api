FROM node:lts
RUN npm install -g pnpm
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN pnpm install --production --silent && mv node_modules ../
COPY . .
RUN npx prisma generate 
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
