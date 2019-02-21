# Bank OZK Finance App - Identity Server

This project is for serving up the .NetCore IdentityServer 4. This will handle all Authentication and Authorization.

## Swagger

This project uses Swashbuckle's Swagger to give a better look at the APIs available.

To view the Swagger UI, go to:

```
http://localhost:5000/swagger
```

## Installing

Make sure your command prompt is in the `./App.IdentityServer/` folder.

Then run:
```
dotnet build

// then

dotnet run
```

This should start the server at `http://localhost:5000/`

## Admin UI

Once the project is running, you can go to `http://localhost:5000/admin`.

This will bring you a simple UI to add/edit Users, Roles, Claim Types, etc.

