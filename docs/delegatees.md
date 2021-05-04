# Get delegatees

Used to Get delegatees.

**URL** : `/leaves/delegatees/`

**Method** : `GET`

**Auth required** : NO


## Success Response

**Code** : `200 OK`

**Content schema**

```json
{
    status: boolean,
    data: {
        delegatees:{
            "name": string,
            "email": string,
            "id": int,
            "createdAt": string,
            "updatedAt": string
        }
    }
}
```