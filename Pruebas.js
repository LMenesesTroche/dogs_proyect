const arr = [
    {
        "id": 1,
        "username": "luCas",
        "password": "123a"
    },
    {
        "id": 2,
        "username": "luCfas",
        "password": "123a"
    },
    {
        "id": 3,
        "username": "lucasMeneses",
        "password": "123abc"
    }
]
const found = arr.find((element) => element.username == "luCfas");
console.log(found)
