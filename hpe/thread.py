import io
import time
import string
import threading
import sys
import os
from pathlib import Path
import json
import platform
import pprint


class WordCount:

    def __init__(self):
        self.files = []
        self.word_count = {}
        self.file_count = {}
        self.words = {}
        self.table = str.maketrans({key: None for key in string.punctuation})
        self.mutex = threading.Lock()
        self.path = os.getcwd()
        self.file_name = self.path+"/output.txt"
        self.file_name_top = self.path+"/output_100.txt"
        self.search_file_name = self.path+"/search.txt"
        self.file_main = self.path+"/filemain.txt"
        self.platform = platform.system()

    def readMainFile(self):
        with io.open(self.file_main, 'r', encoding='utf8') as fin:
            for line in fin:
                if line != '':
                    self.files.append(line.rstrip())

    def readFromFiles(self, file):
        word_count = {}
        words = []
        with io.open(file, 'r', encoding='utf8') as fin:
            for line in fin:
                line = line.translate(self.table)
                for word in line.split():
                    if word not in word_count:
                        word_count[word] = 0
                        words.append(word)
                    else:
                        word_count[word] += 1
        self.mutex.acquire()
        for key, val in word_count.items():
            if key in self.words:
                self.words[key] += val
            else:
                self.words[key] = val
            if key not in self.word_count:
                if self.platform == 'Windows':
                    self.word_count[key] = [
                        {"file": file.split("\/")[-1], "count":val}]
                else:
                    self.word_count[key] = [
                        {"file": file.split("/")[-1], "count": val}]
            else:
                if self.platform == 'Windows':
                    self.word_count[key].append(
                        {"file": file.split("\/")[-1], "count": val})
                else:
                    self.word_count[key].append(
                        {"file": file.split("/")[-1], "count": val})
        self.file_count[file] = word_count
        self.mutex.release()

    def getFileName(self):
        return (self.file_name, self.search_file_name)

    def startThreads(self):
        t = []
        for i, file in enumerate(self.files):
            t.append(threading.Thread(target=self.readFromFiles, args=(file,)))
            t[-1].start()
        [i.join() for i in t]

    def manualCount(self):
        f = {}
        s = {}
        for i in self.files:
            f[i] = {}
            with io.open(i, 'r', encoding='utf8') as fin:
                for line in fin:
                    line = line.translate(self.table)
                    for word in line.split():
                        if word not in f[i]:
                            f[i][word] = 1
                        else:
                            f[i][word] += 1
                        if word not in s:
                            s[word] = 1
                        else:
                            s[word] += 1

    def prettyPrint(self, search):
        output = []
        output_first_100 = []
        count = 0
        for key, val in sorted(self.words.items(), key=lambda t: t[1], reverse=True):
            k = {"word": key, "total_count": val,
                 "in_files": self.word_count[key]}
            output.append(k)
            if count < 100:
                output_first_100.append(k)
            count += 1
        new_k = {"type": "success", "data": output_first_100}
        new_o = {"type": "success", "data": output}
        o = open(self.file_name, "w")
        js = json.dumps(new_o)
        o.write(js)
        o.close()
        o = open(self.file_name_top, 'w')
        js = json.dumps(new_k)
        o.write(js)
        o.close()
        if search:
            total_count = 0
            total_by_files = 0
            for i in output:
                if search == i['word']:
                    total_count = i["total_count"]
                    total_by_files = i["in_files"]
            k = {"type": "success", "data": [
                {"word": search, "total_count": total_count, "in_files": total_by_files}]}
            s = open(self.search_file_name, 'w')
            sj = json.dumps(k)
            s.write(sj)
            s.close()
            pprint.pprint(k)
        else:
            pprint.pprint(output)


if __name__ == "__main__":
    search = sys.argv[1]
    w = WordCount()
    if search == 'null':
        w.readMainFile()
        w.startThreads()
        w.prettyPrint(False)
    else:
        w.readMainFile()
        w.startThreads()
        w.prettyPrint(search)
    print("123456789")
    # w.manualCount()
