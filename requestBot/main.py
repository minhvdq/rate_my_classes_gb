import requests
import json

baseUrl = "http://localhost:3000/api/class"

def getJson( dir ):
    with open(dir, 'r') as file:
        data = json.load(file)
    return data

def postData( ):
    csClasses = getJson('./classes/cs.json')
    profList = getJson('./profList.json')
    for cl in csClasses:
        dep = cl["department"]
        profs = profList.get(dep, [])  # use .get to avoid KeyError
        cl["professors"] = profs
        # print(cl)
        response = requests.post(baseUrl, json=cl)
        if response.status_code == 201:
            print(f"Posted: {cl['name']}")
        else:
            print(f"Failed to post {cl['name']}: {response.status_code} - {response.text}")

postData()