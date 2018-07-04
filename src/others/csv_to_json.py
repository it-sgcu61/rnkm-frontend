import sys # sys.stdin
import csv # csv.reader
import json # json.dump

head, *body = list(map(list, csv.reader(sys.stdin, delimiter=',', quotechar='"')))

ac = []
for line in body:
    d = dict(zip(head, map(str.strip, line)))
    s = json.dumps(d, indent=2, ensure_ascii=False)
    ac.append(s.replace(u'\xa0', u' '))

ac = ",\n".join(ac)
print(f'[\n{ac}\n]')
