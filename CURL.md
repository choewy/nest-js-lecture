# Users

## Create User

```
$ curl -X POST http://localhost:5000/users -H "Content-Type: application/json" -d '{"name": "최원영", "email": "choewy32@gmail.com", "password": "choewy"}'
```

## Email Verify

```
$ curl -X POST http://localhost:5000/users/email-verify\?signupVerifyToken\=test_token


$ curl http://localhost:5000/users -H "Content-Type: application/json" -X POST -d '{"name":"최원영","email":"choewy32@gmail.com","password":"choewy"}'
```

## User Login

```
$ curl -X POST http://localhost:5000/users/login -H "Content-Type: application/json" -d '{"email": "choewy32@gmail.com", "password": "choewy"}'
```

## Get User Info

```
$ curl -X GET http://localhost:5000/users/1
```
