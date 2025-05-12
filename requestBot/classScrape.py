import time
import json
import pickle
import os
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from dotenv import load_dotenv, dotenv_values 

baseUrl = "http://localhost:3000/"
from services import get_raw_html, import_json

classPath = "./classes/"

def get_classes(url, department):
    arr = []
    soup = get_raw_html(url)
    lis = soup.find_all("li")
    for li in lis:
        btn = li.find("button")
        if btn == None:
            continue
        spns = li.find_all("span")
        if len(spns) < 2:
            continue
        classCode = spns[0].text
        classCode = classCode.replace("-", " ")
        className = spns[1].text
        cls = classCode + ": " + className
        print(cls)
        arr.append({
            "name": cls,
            "department": department
        })
    return arr

def depToName( dep ):
    return dep.replace(" ", "").replace("&", "")

def main():
    jsonClasses = import_json("./resources/classInfo.json")
    for cls in jsonClasses:
        dep = cls["department"]
        url = cls["url"]
        depFilename = depToName(dep)
        depPath = classPath + depFilename + ".json"
        # arr = get_classes(url, dep)
        # with open(depPath, "w") as f:
        #     json.dump(arr, f, indent=4)
        classes = import_json(depPath)
        for cls in classes:
            response = requests.post(baseUrl + "api/class", json=cls)
            if response.status_code == 201:
                print(f"Posted: {cls['name']}")
            else:
                print(f"Failed to post {cls['name']}: {response.status_code} - {response.text}")

main()