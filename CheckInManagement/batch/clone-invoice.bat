@echo off
Copy checkin data to read database
echo mongo "mongodb://admin:admin123@ds343217.mlab.com:43217/readcheckin" --eval "db.dropDatabase(); db.copyDatabase('writecheckin', 'readcheckin', 'ds343217.mlab.com:43217', 'admin', 'admin123', null)"
echo done copying database
