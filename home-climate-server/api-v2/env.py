import os

# Hostname for the database server
os.environ['DB_HOST'] = 'home-climate.database.windows.net'

# Name of the database where metrics are stored
os.environ['DB_NAME'] = 'home-climate-db'

# Username to login into the db server
os.environ['DB_USER'] = 'pi'

# Password for the db server
os.environ['DB_PASSWORD'] = 'R@aspberriNabz'
