
Colors : 
1. Orange : #ff5733
2. Green :  #33431f , #1f4233
3. Gray green blue : #40556076
4. gray color : #c0c0c0
5. yello : #ffcc00
6. red :  #ff3333



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


Get Public Images : 
