# Bank OZK Finance App - Web Server

This project is for serving up the .NetCore AspNet Web Server. This will handle all data APIs and the Client-side App.

## Installing

Make sure your command prompt is in the `./App.Web/` folder.

Then run:
```
npm install // to download/install all NPM packages

dotnet build // to build the .NetCore project

// then

dotnet run
```

This should start the server at `http://localhost:62098/`


## Swagger

This project uses Swashbuckle's Swagger to give a better look at the APIs available.

To view the Swagger UI, go to:

```
http://localhost:62098/swagger
```

