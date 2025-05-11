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

def afind( array, str ):
    for val in array:
        if(val in str):
            return val
    return "Not found"

def import_json(file_path):
    """
    Imports a JSON file and returns the data as a Python dictionary.

    Args:
        file_path (str): The path to the JSON file.

    Returns:
        dict: The data from the JSON file as a Python dictionary, or None if an error occurs.
    """
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        print(f"Error: File not found: {file_path}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in: {file_path}")
        return None
    except Exception as e:
         print(f"An unexpected error occurred: {e}")
         return None

def get_raw_html(url):
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    service = Service(ChromeDriverManager().install())

    try:
        print("Fetching HTML from ", url)
        driver.get(url)
        time.sleep(2)
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        return soup
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None
    finally:
        driver.quit()

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
        # print(profName)
        line = prof.text
        line = line.replace(profName, "")
        line = line.replace("<strong>", "")
        line = line.replace("<strong/>", "")
        title = line.split(";")[1]
        subjects = import_json("resources/subjects.json")
        subjects = subjects["departments"]
        dep = afind(subjects, title)
        if(dep == "Not found"):
            print(profName)
            print("Not Found")
            print(line)
            dep = afind(subjects, line)
            print(dep)
            nfCnt += 1
        # print(dep)
        profCount += 1
    print(profCount)
    print(nfCnt)

# subjects = import_json("resources/subjects.json")
# subjects = subjects["departments"]
# print(subjects)

main("https://www.gettysburg.edu/academic-programs/curriculum/catalog/faculty-registry/current-faculty")