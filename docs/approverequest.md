# Approve request

Used to approve a  Request.

**URL** : `/leaves/approve/:requestId`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "requestId": "[existing request id]",
}
```


## Success Response

**Code** : `200 OK`

**Content schema**

```json
{
    status: boolean,
}
```
## Error Response

**Condition** : If requestId does not exist.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    status: boolean,
    error: string
}
```