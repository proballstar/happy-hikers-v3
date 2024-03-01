import os; from random import randint
for x in range(int(input("Enter your range: "))):
    for j in range(0, randint(1,10)):
            with open('file.txt', 'a') as f: f.write(str(x) + ' days ago')
            os.system('git add .'); os.system('git commit --date="'+str(x) + ' days ago'+'" -m "commit"')
os.system('git push -u origin main')