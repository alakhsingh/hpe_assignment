import random
ch = list("abcdefghijklmnopqrstuvwxyz")

f1 = open("filemain.txt", "w")
num_files = 201
num_words = 50000
for i in range(1, num_files):
    fname = "file"+str(i)+".txt"
    f = open(fname, "w")
    print(fname)
    p = ""
    for j in range(num_words):
        v = ""
        for k in range(random.randint(1, 7)):
            v += ch[random.randint(0, 25)]

        p += v+" "
        if j % 20 == 0:
            p += '\n'
    f.write(p)
    f.close()
    f1.write(fname+"\r")
