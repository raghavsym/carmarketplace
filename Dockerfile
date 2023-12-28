FROM node:18.7.0

# Create app directory
WORKDIR /code

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3001

CMD [ "node", "./build/config/server/index.js" ]


# docker run \
# -it --rm -d \
# --network mongodb \
# --name raghav \
# -p 8081:8081 \
# -e SERVER_PORT=8081 \
# -e SERVER_PORT=8081 \
# -e DATABASE_CONNECTIONSTRING=mongodb://mongodb:27017/SOCAR \
# raghav/car-market-place

# curl --request POST \
# --url http://localhost:8081/auth/signup \
#   --header 'content-type: application/json' \
#   --data '{
# "name": "this is a note",
# "text": "this is a note that I wanted to take while I was working on writing a blog post.",
# "owner": "peter"
# }'