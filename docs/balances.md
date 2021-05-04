# Get balances for user

Used to Create request.

**URL** : `/leaves/balances/`

**Method** : `GET`

**Auth required** : Yes


## Success Response

**Code** : `200 OK`

**Content schema**

```json
{
    status: boolean,
    data: {
        leaveBalance: {
            "study": number,
            "compassionate": number,
            "unpaid": number,
            "annual": number   
        }
    }
}
```