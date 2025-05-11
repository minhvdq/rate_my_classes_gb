import requests
import json

baseUrl = "http://localhost:3000/"

urls = ["asianStudies", "biology", "chemistry", "economics", "management", "physics", "psychology"]

def getJson( dir ):
    with open(dir, 'r') as file:
        data = json.load(file)
    return data

def postData( url ):
    finalUrl = './classes/' + url + '.json'
    csClasses = getJson(finalUrl)
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

def getData( url ):
    response = requests.get(baseUrl)
    return response.json()


def updateData():
    for cl in classes: 
        id = cl['id']
        url = baseUrl + "/" + id
        print(url)
        response = requests.delete(url)
        if response.status_code == 204:
            print(f"Deleted: {cl['name']}")
        else:
            print(f"Failed to delete {cl['name']}: {response.status_code} - {response.text}")
            return

        rp = requests.post(baseUrl, json=cl)
        if rp.status_code == 201:
            print(f"Posted: {cl['name']}")
        else:
            print(f"Failed to post {cl['name']}: {rp.status_code} - {rp.text}")

def pushProfs():
    url = baseUrl + "api/professor"
    profs = getJson('./resources/professors.json')
    for prof in profs:
        response = requests.post(url, json=prof)
        if response.status_code == 201:
            print(f"Posted: {prof['name']}")
        else:
            print(f"Failed to post {prof['name']}: {response.status_code} - {response.text}")

pushProfs()