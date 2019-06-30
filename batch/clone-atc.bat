@echo off
Copy atc write to atc read database.
echo Copying write to read database...
mongo "mongodb://Admin:Password123@ds343217.mlab.com:43217/readatc" --eval "db.dropDatabase(); db.copyDatabase('writeatc', 'readatc', 'ds343217.mlab.com:43217', 'Admin', 'Password123', null)"
echo Done copying database...
pause


