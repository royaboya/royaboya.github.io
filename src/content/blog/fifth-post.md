---
title: 'C2C CTF 2025'
description: 'Fifth Post'
pubDate: 'Feb 9 2025'
heroImage: '/c2c.jpg'
---
I got incredibly humbled by this CTF but it was a good learning experience nonetheless.

# Binary
I wasn't able to save the challenge descriptions, but each of the challenges were to try and get the flag out of the binary.


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

## Husky Hunt

## Paws' Hideout

## Northeastern hASCII's

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

MIGI MISTUDOME IMG

Looking it up on google it's a pretty common thing to find in Japanese Shinto Shrines so I started looking up Shinto Shrines in Japan. The only problem is that there are A LOT of Shinto Shrines in Japan and finding this one would be a bit difficult since this is not the only red one in Japan. 




# Web


## Hunger Games

## Graduation



# Forensics

## Unknown File Type
Again, I did not save the challenge description but the challenge was to identify what the file was for.








    



