Clone the repository

# Requirements 
```
# java - 11 
sudo apt-get install openjdk-11-jdk
# postgresql
sudo apt install postgresql -y
```

# Database start at boot
```
# following https://adamtheautomator.com/pgadmin-ubuntu/

# Starts the PostgreSQL service
systemctl start postgresql

# Enables the PostgreSQL service to start at bootup
systemctl enable postgresql
-----------------------------------------------------------------

# Check status 
systemctl status postgresql

# Check if accepting connection 
sudo pg_isready
```


# Databse login as superuser
```
# Changes to the postgres user
sudo su - postgres
# Opens the psql CLI
psql


# Create user coursemelaadmin
CREATE USER coursemelaadmin WITH PASSWORD '123';

# Create databse coursemela 
CREATE DATABASE coursemela;

# Grant all privileges to our admin 
GRANT ALL PRIVILEGES ON DATABASE coursemela to coursemelaadmin
```


# Run the app
```
./mvnw spring-boot:run
```

