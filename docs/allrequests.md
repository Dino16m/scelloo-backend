# Get all requests

Used to get all requests.

**URL** : `/leaves/all`

**Method** : `GET`

**Auth required** : NO


## Success Response

**Code** : `200 OK`

**Content schema**

```json
{
    status: boolean,
    data: {
        requests: {
            "leaveType": string,
            "details": string,
            "startDate": string,
            "endDate": string,
            "allowance": boolean,
            "delegateeId": number,
        }[]
    }
}
```