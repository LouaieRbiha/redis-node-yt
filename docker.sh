# First step is to fetch the redis image from official library, create a container, run the container
# Mapping the port from container to host, which makes it accessible from outside of the container on localhost
# Set a local volume to persist the data "/local:/container"
docker run --name redis -d -v ~/volumes/redis:/data -p 6379:6379 --restart unless-stopped redis redis-server --appendonly yes

# Meaning of appendonly: Appendonly: https://redis.io/topics/persistence

# Execute bash on the newly created container
docker exec -it redis bash

# Write this for testing redis
redis-cli

"""
SET foo yessss
GET foo
"""