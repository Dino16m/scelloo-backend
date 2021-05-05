# Create request

Used to Create request.

**URL** : `/leaves/request/`

**Method** : `POST`

**Auth required** : Yes

**Data constraints**

```json
{
     
    "leaveType": string,
    "details": string,
    "startDate": string,
    "endDate": string,
    "allowance": boolean,
    "delegateeId": number,
}

### Please use the name Chike Ogbonna as delegatee as it is the oonly delegatee seeded

## Success Response

**Code** : `200 OK`

**Content schema**

```json
{
    status: boolean,
    data: {
        requests: {
            "id": number,
            "delegatee": User,
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