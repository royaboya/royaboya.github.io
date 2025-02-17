---
title: 'C2C CTF 2025'
description: 'Fifth Post'
pubDatetime: 2025-02-09T00:00:00Z
heroImage: '/c2c.jpg'
---
I got incredibly humbled by this CTF but it was a good learning experience nonetheless. I did end up qualifying for finals (I think) despite not doing much on the second day of the CTF. I also wasn't able to save the web challenges since the server is down.

# Binary
No descriptions but each of the challenges were to try and get the flag out of the binary.

## HuskySniff
Provided binary: `huskysniff`
```
roya@LAPTOP-EGQVCHJB:/mnt/c/C2CTF$ ./huskysniff
Word on campus is the Northeastern Husky sniffed out the hidden flag—apparently it's tucked away in the executable. Woof you waiting for? Happy hacking!  
```
I ran `strings`:
```
/lib64/ld-linux-x86-64.so.2 // line 1
libc.so.6
__printf_chk
__cxa_finalize
......
.fini_array
.dynamic
.data
.bss
.comment // line 826
```
Then `grep`'d it with `string=c2c` to get `c2c_ctf{crwzotngdyqfqbjc}`

**Flag**: c2c_ctf{crwzotngdyqfqbjc}


## Husky Walk 
Provided binary: `huskywalk`

```
roya@LAPTOP-EGQVCHJB:/mnt/c/C2CTF$ ./huskywalk
Hey hooman! Can we pleaaase go to the park? I wanna run super fast, sniff all the things, and maybe make some new furry friends! Pretty please with extra belly rubs? Which park are we going to?! 
 blahblahblah
Umm, hooman… not that park! It's boring, no good sniffs, and no fun friends to play with! Can we go somewhere way more exciting instead? Pleaaase? 
```

I ran `strings ./huskywalk | grep {` and then found the flag: 
```
c2c_ 
f{Qv7T8bWcY3nR1oJ}
```
After fixing the flag with the correct format: 

**Flag**: C2C_CTF{Qv7T8bWcY3nR1oJ}

## Husky Hungry
Provided binary: `huskyhungry`

```
roya@LAPTOP-EGQVCHJB:/mnt/c/C2CTF$ ./huskyhungry
Arooo! Hey there, human friend-I'm feeling rumbly in my tummy again. If you bring me that tasty salmon I love so much, I'll let you in on a little secret...and by secret, I mean a very special flag! So don't keep a hungry Husky waiting-fetch that feast, and the flag is yours! Woof!                                
testtestesttest                               
I sniff the bowl, wrinkle my nose, and whine softly—this meal just isn't doing it for me.                                                                    
```
I ran `strings ./huskyhungry > huskyresult.txt` and opened `huskyresult.txt` in a text editor and started browsing.

```
UPX!@ // line 1 
@m>	`o_`o
P/PI
/6,DO
tdOQn
}_PSH
/@ _
/p+_
/0-_
*/pF^
F/o.
$aEh
/@%I
ME=n
........
L$.e
hTam
atbss
ot	+l
sub%#08
>IO_v
/vQ0H
DwO	
UPX!
UPX! // line 5053
```

So anyways, I started mindlessly scrolling through the file until I found some nice text:
```
@NNn
@P`NNNNp
NNNN
 0@P
n2n_neq{MfTjl
bkFZysblJfG}omm, this
perfect! I'm so happy
ra.icall
dancing
[klfor
```
The string `n2n_neq{MfTjlbkFZysblJfG}` seems to be the flag so we throw it into cyberchef with `ROT13` bruteforce and see that an offset of 15 gives us the flag.

**Flag**: c2c_ctf{BuIyaqzUOnhqaYuV}

## Husky Play
Provided binary: `huskyplay`
```
roya@LAPTOP-EGQVCHJB:/mnt/c/C2CTF$ ./huskyplay

Hey hooman, I've been such a good pup today! Do you think maybe, just maybe, you have a little surprise for me? Something fun, something squeaky, something I can chase around and cuddle with? Pleeeease?                                                                                                                
testestkdjds;                                                                                                                         
Hooman, I appreciate the effort, but... um, what is this? It doesn't squeak, it doesn't bounce, and it definitely doesn't taste like anything fun. Are you sure this is for me? Maybe we can, you know... trade it for something cooler? Just saying! 
```

This challenge was very similar to that of Husky Hungry so I did the same thing by running `strings` and going through the entire text output:
```
NNNN
 0@P
y2y_ypb{mtkLr
rReqfswcJNh}?Oh wow, hooman
! This 
AMAZING It'
t PERFECT for my zbiesBYou
 reall&
tdid y
rself t
timeJA
okenJf
appjcia<on
```

Putting the flag y2y_ypb{mtkLrrReqfswcJNh} into cyberchef with `ROT13` and a key of 4 gives us the flag.

**Flag**: c2c_ctf{qxoPvvViujwagNRl}


# Cryptography
---
## Husky Hash
---
We're given a couple of files 

1. `passwd` - a file containing a hash `$1$NhbjPGQ4$lefNvFEkghKhMx5M0tUXr1`
2. `words` - a wordlist containing passwords
3. `flag` - a folder containing a password protected png
---

The challenge is probably cracking the hash and inputting the password to get access to the png so we boot up `hashcat` to go through the wordlist to find the password.

```
PS C:\Users\roya\OneDrive\Desktop\hashcat-6.2.6> .\hashcat.exe -m 500 passwd.txt words.txt --show                                  $1$NhbjPGQ4$lefNvFEkghKhMx5M0tUXr1:husky     
```

Now we pass `husky` in as the password to see the png: 

![Birds on Wire](/c2c/birds.png "Bird Wire Cipher") 

This cipher is called Birds on a wire cipher so we just hop on [dCode](https://www.dcode.fr/birds-on-a-wire-cipher) and paste in all of the different matching images to get the flag.

**Flag**: C2C_CTF{HOWLINGHUSKIES}

## Paws' Hideout
We're given a `directions` text file with a bunch of ups and downs: 

```
updownupupupupdowndown upupdowndownupupdownup updownupupupupdowndown updownupdowndowndowndowndown updownupupupupdowndown updownupdownupdownupup updownupupupdowndownup updowndowndowndownupdowndown updowndownupupupdownup updowndownupdownupupdown updowndownupdowndowndownup updowndownupupupupdown updowndowndownupupdownup updowndowndowndownupupdown updownupdowndowndowndowndown updowndowndownupupdowndown updowndowndownupdownupdown updowndownupupupdownup updowndowndownupupdowndown updowndowndownupdownupup updowndownupdownupupdown updowndowndownupdownupup updowndowndownupdownupdown updowndowndownupdownupup updowndownupdownupupdown updowndownupdowndowndowndown updowndownupdowndowndownup updownupdowndowndowndowndown updowndownupupdowndownup updowndownupdowndowndowndown updowndowndownupupdownup updownupdowndowndowndowndown updowndownupupdownupup updowndownupupupupdown updownupdowndowndowndowndown updowndowndownupdowndowndown updowndownupdownupupdown updowndownupdowndowndownup updowndowndowndowndownupdown
```

We see that each section has eight words, either of which is up or down so this is most likely binary representation of the bytes so we can quickly convert the ups and downs to binary:

```py
# convert.py
cipher = "updownupupupupdowndown upupdowndownupupdownup updownupupupupdowndown updownupdowndowndowndowndown updownupupupupdowndown updownupdownupdownupup updownupupupdowndownup updowndowndowndownupdowndown updowndownupupupdownup updowndownupdownupupdown updowndownupdowndowndownup updowndownupupupupdown updowndowndownupupdownup updowndowndowndownupupdown updownupdowndowndowndowndown updowndowndownupupdowndown updowndowndownupdownupdown updowndownupupupdownup updowndowndownupupdowndown updowndowndownupdownupup updowndownupdownupupdown updowndowndownupdownupup updowndowndownupdownupdown updowndowndownupdownupup updowndownupdownupupdown updowndownupdowndowndowndown updowndownupdowndowndownup updownupdowndowndowndowndown updowndownupupdowndownup updowndownupdowndowndowndown updowndowndownupupdownup updownupdowndowndowndowndown updowndownupupdownupup updowndownupupupupdown updownupdowndowndowndowndown updowndowndownupdowndowndown updowndownupdownupupdown updowndownupdowndowndownup updowndowndowndowndownupdown"

cipher = cipher.replace("up",  "0").replace("down", "1")

print(cipher)
```
Run to get:

```
PS C:\C2CTF\python .\convert.py
01000011 00110010 01000011 01011111 01000011 01010100 01000110 01111011 01100010 01101001 01101110 01100001 01110010 01111001 01011111 01110011 01110101 01100010 01110011 01110100 01101001 01110100 01110101 01110100 01101001 01101111 01101110 01011111 01100110 01101111 01110010 01011111 01100100 01100001 01011111 01110111 01101001 01101110 01111101
```

Then we chuck that into Cyberchef, apply the `FromBinary` recipe to get the flag.

**Flag**: C2C_CTF{binary_substitution_for_da_win}

## Northeastern hASCII's

We're given an `output` file and a `secret.py` file that generates the output file from a flag. 

```
# output 
210,222,223,213,215,209,192,207,210,195,210,212,211,217,204,196,203,219,229,219,196,160,148,150,140,146
```

```py
# secret.py
# N/A since I modified it and don't have another copy
```

The `secret.py` file essentially goes through the flag and takes the sum of the unicode encodings of the current character and the subsequent character and prints it before looping onto the next character.

To solve this, we can take make guesses for the first character and then keep retrying different characters until we get something legible.

```py
lst =  [210,222,223,213,215,209,192,207,210,195,210,212,211,217,204,196,203,219,229,219,196,160,148,150,140,146]

alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

def guess(letter):
    buffer = ""
    first_char_guess = letter
    buffer += first_char_guess
    
    for i in range(len(lst)-1):
        
        value = ord(first_char_guess)
        
        guess = chr(lst[i]-value)
        buffer += guess
        
        first_char_guess = guess
                
    print(buffer)    

for c in alphabet:
    guess(c)
```
If we guess `c` as the first character, we get `cooper_and_sarge_love_ASCI`. The last character is omitted but we can infer it to be `I`.

**Flag**: `C2C_CTF{cooper_and_sarge_love_ASCII}

# OSINT
## Google En Passant
---
Paws is a huge fan of chess. They’re such a huge fan that they happened to be at the competition where two titans collided. With three victories to zero in ten games, it was clear who was going to win the series; Paws knew it too, but couldn’t help but root for the veteran opponent. After the eventual conclusion, Paws toured the city visiting the famous beach and kicking back to relax until the flight back home.

CTF, what could the C2C_CTF{Name_Beach_City} potentially be?

---
I spent an awful amount of time on this 100 point challenge, but I started looking up famous chess matches involving en passant (e.g, chess en passant champtionship) and I started browsing the 2024 Championship match between Gukesh and Ding Liren. However, the 3 victories to zero score didn't make sense to me so I ended bruteforcing all of the previous years' championships until I came across the 2013 championship between Magnus Carlsen and Viswanathan Anand where Magnus had won with 3 victories and 7 draws. Then, I saw that it was held in Chennai, India and I then proceeded to see what famous beaches there were with Marina Beach being the top result.

**Flag**: C2C_CTF{Marina_Beach_Chennai}

## Picture Game
---
Missing challenge prompt, but the goal was to find the location of the image:

![Picture game](/c2c/OSINT-PictureGame.png "Japanese Shrine") 

Flag Format: C2C_CTF{Something_Something_City}

---

The image was impossible to reverse image search so the first step was to take a look at what was in the image, I first noticed a unique circular logo:

![Migi Mitsudomoe](/c2c/migi.png "Circular logo") 

Looking it up on google, Migi Mitsudomoe, is a pretty common thing to find in Japanese Shinto Shrines so I started looking up Shinto Shrines in Japan. The only problem is that there are A LOT of Shinto Shrines in Japan and finding this one would be a bit difficult since this is not the only red one in Japan. 

First, I tried going on google maps and searching up Shinto Shrines in every major city but that turned out to work terribly...
But with a couple of queries on google such as `shrines with migi mitsudomoe`, `red shrine migi mitsudomoe` there was one site in particular that stood out: https://www.goteamjosh.com/blog/tag/Eight+Shrines+of+Okinawa with a very unique image.

Reverse image searching the title image gives us the Naminoue Shrine in Naha, Japan.

**Flag**: C2C_CTF{Naminoue_Shrine_Naha}

# Forensics

## Unknown File Type
Again, I did not save the challenge description but the challenge was to identify what the file was for.

Provided File: `OSINT-SuperEasy.gb`

Running `file` on the `.gb` file tells us that it is a game boy ROM image: 

`OSINT-SuperEasy.gb: Game Boy ROM image: "UNTITLED" (Rev.01) [MBC5+RUMBLE+SRAM+BATT], ROM: 1Mbit, RAM: 256Kbit`

Then I did a little bit of googling and ended up installing `Visual Boy Advance` which is a Game Boy Advance Emulator. Then I opened the file in the application and pressed `Enter` to get the following: 

![Game boy img](/c2c/gb.png "Game boy emulator") 

I'm not sure if I did anything else after this step since the challenge is down now and it doesn't decode to anything special from hex on cyberchef so I will assume this to be the correct flag.

**Flag:**: C2C_CTF{2443f7d3eb2f47412b324dc0f4fdd194914dada963e830a6d46d489e7323d089}

    



