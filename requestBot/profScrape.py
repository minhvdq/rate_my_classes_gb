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
from services import get_raw_html, import_json

keys = ["Professor of", "Chair of", "Lecturer in", "Professor in", "Assistant in", "Chair in"]

def afind( array, str ):
    for val in array:
        altVal = val.replace("&", "and")
        altVal_2 = val.replace(" &", ", and")
        if(val in str or altVal in str or altVal_2 in str):
            return val
    return "Not found"

subjects = import_json("resources/subjects.json")
subjects = subjects["departments"]

# 
def arrInStr(arr, str):
    for val in arr:
        altVal = val.replace("&", "and")
        altVal_2 = val.replace(" &", ", and")
        if(val in str or altVal in str or altVal_2 in str):
            return val
    return "Not found"

def findDep(line):
    chunks = line.split(";")
    res = ""
    for chunk in chunks:
        if(arrInStr(keys, chunk) != "Not found"):
            res = chunk
            break
    dep = afind(subjects, res)
    if dep == "Not found":
        dep = afind(subjects, line)
    return dep

def fixProfName(name):
    words = name.split(" ")
    fixName = ""
    for word in words:
        if("(" in word or ")" in word):
            continue
        fixName += word + " "
    return fixName.strip()

professors = []

def main(url):
    print("Starting main")
    soup = get_raw_html(url)
    profList = soup.find_all('p')
    print(len(profList))
    profCount = 0
    nfCnt = 0
    for prof in profList:
        if("<strong>" not in str(prof)):
            # print("found no strong")
            # print(prof)
            continue
        profName = prof.strong.text
        profName = fixProfName(profName)
        # print(profName)
        line = prof.text
        line = line.replace(profName, "")
        line = line.replace("<strong>", "")
        line = line.replace("<strong/>", "")
        
        dep = findDep(line)
        # print(profName)
        # print(line)
        # print(dep)
        # print("--------------------------------")
        profCount += 1
        if(dep == "Not found"):
            print(profName)
            print(line)
            print(dep)
            nfCnt += 1
            print("--------------------------------")
            continue

        professors.append({
            "name": profName,
            "department": dep,
        })

    print(profCount)
    print(nfCnt)
    filename = "resources/professors.json"
    with open(filename, "w") as f:
        json.dump(professors, f, indent=4)

# subjects = import_json("resources/subjects.json")
# subjects = subjects["departments"]
# print(subjects)

main("https://www.gettysburg.edu/academic-programs/curriculum/catalog/faculty-registry/current-faculty")