# Case Coordination and Referral Management (CCRM)

## Backend

### Setting up postgres

#### Install postgres and start service
<pre>
$ brew install postgres
$ brew services start postgres
</pre>

#### Create roles and database
<pre>
# Login to postgres as superuser
$ psql postgres
# Create opengov role in postgres
$ postgres=# CREATE ROLE opengov WITH LOGIN PASSWORD 'YOUR_PASSWORD';
$ postgres=# ALTER ROLE opengov CREATEDB;
# Quit postgres and return to terminal
$ postgres=# \q

# Create database api using the role opengov
$ createdb api -U opengov
</pre>

Create a .env file with the following variables:
<pre>
export NODE_ENV=development || production
export PORT=9000
export DB_USER=opengov
export DB_PASSWORD=YOUR_PASSWORD
export DB_DATABASE=api
export DB_HOST=localhost
export DB_PORT=5432
export COOKIE_DOMAIN=localhost || my-production-domain
export JWT_SECRET=mysecret
export JWT_MAX_AGE=3600000
export ORIGIN=http://localhost:3000 || https://my-production-domain:3000
</pre>

```
# Start backend on localhost:9000
$ source .env
$ npm start
```

## Client

Create a .env file with the following variables (you can skip this step and `PORT` will default to 3000):
<pre>
export PORT=3000
</pre>

```
# Start frontend on localhost:3000
$ npm start
```

## Getting started

Access is only granted to selected users, therefore CCRM does not have a `create` account page. However, for ease of testing, a page like that has been set up at localhost:3000/create. This will eventually be moved to an admin dashboard.
