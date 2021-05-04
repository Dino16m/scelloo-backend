# Create user

Used to create a  User.

**URL** : `/users/create/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address]",
    "name": "[name in plain text]"
}
```


## Success Response

**Code** : `200 OK`

**Content schema**

```json
{
    status: boolean,
    data: {
        "name": string,
        "email": string,
        "id": int,
        "createdAt": string,
        "updatedAt": string
    }
}
```