import random
ch = list("abcdefghijklmnopqrstuvwxyz")

f1 = open("filemain.txt", "w")
for i in range(1, 201):
    fname = "file"+str(i)+".txt"
    f = open(fname, "w")
    print(fname)
    p = ""
    for j in range(50000):
        v = ""
        for k in range(random.randint(1, 7)):
            v += ch[random.randint(0, 25)]

        p += v+" "
        if j % 20 == 0:
            p += '\n'
    f.write(p)
    f.close()
    f1.write(fname+"\r")
