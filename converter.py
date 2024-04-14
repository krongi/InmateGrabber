import os
import sys
import csv

SCRIPT_PATH = "C:/Users/C4/Downloads/"

fileList = os.listdir(SCRIPT_PATH)

for i in fileList:
    if i.endswith(".sem"):
        print(i)
        openFileName = SCRIPT_PATH + i

openFile = open(openFileName, mode="r")

text_replace = openFile.read().replace("Info,", "\n ")

text_replace = text_replace.replace("; ", ", ")

text_replace = text_replace.replace("\t", "; ")

openFile.close()

openFile = open(openFileName, mode="w")

openFile.write(text_replace)

openFile.close()

openFile = open(openFileName, mode="r")

csvFile = open(file=SCRIPT_PATH+"jailList.csv", mode="w")
csvWrite = csv.writer(csvFile,)
value = openFile.read()

# print(value.splitlines())
values = value.splitlines(True)
csvWrite.writerow(values)    # value = openFile.readline(
csvFile.close()