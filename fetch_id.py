import urllib.request
import re
html = urllib.request.urlopen('https://www.youtube.com/@STEVEMARCEL').read().decode('utf-8')
m = re.search(r'"channelId":"(UC[^"]+)"', html)
if m:
    print(m.group(1))
else:
    print("Not found")
