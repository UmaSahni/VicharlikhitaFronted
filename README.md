fetch

fetch(url, {
method : "POST",
headers: {
Content-Type : application/json,
token : `Bearer ${token}`
}
body : json.stringify(obj)
})

```js

fetch(`${baseUrl}/notes/add`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(noteData),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
  
```
