@echo off
Copy invoice write to invoice read database.
echo Copying write to read database...
mongo "mongodb://admin:Admin0@ds046037.mlab.com:46037/readbooking" --eval "db.dropDatabase(); db.copyDatabase('writebooking', 'readbooking', 'ds040837.mlab.com:40837', 'admin', 'Admin0', null)"
echo Done copying database...
pause