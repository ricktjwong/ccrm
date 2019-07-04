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
# Add schema for the api database
$ psql -U opengov api < models/schema/users.sql
</pre>

Create a .env file with the following variables:
<pre>
export DB_USER=opengov
export DB_PASSWORD=YOUR_PASSWORD
export DB_DATABASE=api
export DB_HOST=localhost
export DB_PORT=5432
</pre>

## Client
