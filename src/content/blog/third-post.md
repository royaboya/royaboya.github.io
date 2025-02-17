---
title: "NEU CTF Club 'Hack the Playground'"
description: 'Third Post'
pubDatetime: 2025-01-14T00:00:00Z
heroImage: '/htp/title.png'
---

Some solutions to my school's CTF Club Challenges for the Hack the Playground GM in the time that I was there 

--- 

## Minesweeper

What is the coordinate of where the last flag should be planted?
![minesweeper flag img](/htp/minesweeper.png "Minesweeper img")  

Flag format is: CTF{(col,row)}

I assumed this was going to be a steganography challenge but it quite literally is a minesweeper 
challenge

Flag: CTF{(9,5)}

---

## Hide n Seek: Hiding Monster
Hide n Seek is so fun! I swear, I just saw the monst around
here somewhere... did he hide in this website somehow?

After opening the challenge link, the tab name was `Cookie Challenge` so it probably had to do with
just checking what cookies were received so going to inspect element > Applications, there was one cookie
with name `secret_cookie` and the value containing the flag:

secret_cookie CTF{C00KIEM0NST3R}


## Four-Square
Hmmm... I was told there would be four square at recess,
but instead I got an image and a message. Since when do
students do this instead of playing outside?

Message: KLDUBSBEEBGTVNAOLGMIABMI

![four square matrices](/htp/four.png "Four Square Matrices")

Given the flavor text, I looked up Four Square Cipher and went on [dCode](https://www.dcode.fr/four-squares-cipher)
and inputted the same exact entries in the matrices and decoded the message

CTF{FOURSQUAREISCOOLWITHMATH}

----

## Hopscotch

Did you know I am actually The World's Best Hopscotcher™? No way
you beat me in it! I'll even give you a prize if you do.

The first hop is here

```
Welcome to the new and improved Hopscotch!! Follow all the hops and you'll (eventually) find the flag!

For starters, the first hop can be found at
```

Opening the page source we get another hint to the path:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Hopscotch 0</title>
    </head>
    <body>
        <p>Welcome to the new and improved Hopscotch!! Follow all the hops and you'll (eventually) find the flag!</p>
        <p>For starters, the first hop can be found at</p><!--/hop/swishswoosh/-->
    </body>
</html>
```

Then we append the path in the url to get:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Hopscotch 1</title>
        <link rel="stylesheet" href="/hop/swishswoosh">
    </head>
    <body>
        <h2>Swish swoosh you've made it to the next hop! Uh oh... looks like there's nothing here??</h2>
        <p>Your next destination should be <code>/hop/hippityhoppity</code></p>

        <h5>or is there? ;)</h5>
    </body>
</html>
```

Then we try the `/hop/hippityhoppity` path:

```html

<!DOCTYPE html>
<html>
    <head>
        <title>Hopscotch 2</title>
        <link rel="stylesheet" href="/hop/hippityhoppity/index.css">
    </head>
    <body>
        <h2 class="hopscotch-heading">Wow, you're quite good at this!</h2>
        <p class="super-secret">The next page should be in this tag except it isn't but it kind of is???</p>
    </body>
</html>
```

We then try the check out the index.css through `"/hop/hippityhoppity/index.css` and in the 
page source is a bunch of labels

```css
.hopscotch-heading {
    color: black;
}


.some-label {
    color: blue;
}


.some-label {
    color: blue;
}

...

.super-secret {
    color: green; /* The next hop is at /hop/potionofleaping */
}
...

.some-label {
    color: blue;
}


.some-label {
    color: blue;
}

```

Then we try `/hop/potionofleaping`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Hopscotch 3</title>
    </head>
    <body>
        <h2>You found me even though I'm super high up???</h2>
        <p>Well, no way you find the <i>next</i> hop</p>

        <!-- Don't forget to remove this! -->
        <script type="text/javascript" src="/hop/nether-wart.js"></script>
    </body>
</html>
```

Access `/hop/nether-wart.js` and see:

```js
function calculateNextHop() {
    let arr = ["s", "d", "u", "o", "l", "c", "e", "h", "t", "n", "i", "p", "u", "/", "p", "o", "h", "/"];
    let reversed = arr.reverse();
    let nextHop = reversed.join("");
    console.log(nextHop);
}
```

This code just reverses the correct path which was already in reverse order so we have another path: `/hop/upintheclouds/`

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Hopscotch 4</title>
    </head>
    <body>
        <h2>You found me even though I'm super high up???</h2>
        <p>There's only one more hop left, I guess I gotta make it really really really hard to find...</p>

        <script type="text/javascript" src="/hop/stratus.js"></script>
        <script type="text/javascript" src="/hop/cirrus.js"></script>
        <script type="text/javascript" src="/hop/cumulus.js"></script>
        <script type="text/javascript" src="/hop/nimbus.js"></script>
    </body>
</html>
```
Here we have four different scripts to check out:

#### stratus.js:
```js
function lets_do_some_simple_math(_0x522d1a){return _0x522d1a+0x1;}
```

#### cirrus.js:
```js
(function(_0x1fc294,_0x183366){var _0x55f524=_0x3fe7,_0x31795b=_0x1fc294();while(!![]){try{var _0x49e416=-parseInt(_0x55f524(0xaa))/0x1+parseInt(_0x55f524(0xa7))/0x2+parseInt(_0x55f524(0xa3))/0x3+-parseInt(_0x55f524(0xa4))/0x4+-parseInt(_0x55f524(0xa6))/0x5*(parseInt(_0x55f524(0xa8))/0x6)+parseInt(_0x55f524(0xa2))/0x7*(-parseInt(_0x55f524(0xab))/0x8)+parseInt(_0x55f524(0xa9))/0x9;if(_0x49e416===_0x183366)break;else _0x31795b['push'](_0x31795b['shift']());}catch(_0x3b8c87){_0x31795b['push'](_0x31795b['shift']());}}}(_0x5d0e,0x3dbcd));function _0x3fe7(_0x5b09a2,_0x4bae2b){var _0x5d0e34=_0x5d0e();return _0x3fe7=function(_0x3fe70b,_0x2f769e){_0x3fe70b=_0x3fe70b-0xa2;var _0x14cbbb=_0x5d0e34[_0x3fe70b];return _0x14cbbb;},_0x3fe7(_0x5b09a2,_0x4bae2b);}function _0x5d0e(){var _0xdf6477=['3274389wtvChK','141618fdkMLt','24Tcryxl','Hello\x20World!','102193LVBWFl','1198017iwJkqg','518240HCBkvu','log','10GRjGAN','19812jPnwdh','615642sosMKD'];_0x5d0e=function(){return _0xdf6477;};return _0x5d0e();}function very_cool_helpful_func(_0x19e62b){var _0x5e6a13=_0x3fe7;console[_0x5e6a13(0xa5)](_0x5e6a13(0xac));}
```

#### cumulus.js:
```js
function tooootally_not_important_at_all_wink_wink() {
    obfuscated_hop = [0x4e,0x1b,0x0a,0x13,0x5a,0x05,0x0a,0x1c,0x0d,0x16,0x0d,0x0a,0x06,0x0c,0x02,0x0b,0x0a,0x1e,0x17,0x1c,0x06,0x1c,0x0a,0x07,0x14,0x06,0x11,0x03,0x0c,0x0a]
    key = [0x61,0x73,0x65,0x63,0x75,0x72,0x65,0x6b,0x65,0x79]
    next_hop = []
    
    counter = 0;
    obfuscated_hop.forEach(element => {
        next_hop.push(key[counter] ^ element);
        counter = (counter + 1) % key.length;
    });

    console.log(next_hop)
}
```

#### nimbus.js:
```js
(function(_0x1c3c35,_0x43f217){var _0x5927af=_0x35e5,_0x4a5974=_0x1c3c35();while(!![]){try{var _0x2a7051=parseInt(_0x5927af(0x1ae))/0x1+parseInt(_0x5927af(0x1b3))/0x2*(parseInt(_0x5927af(0x1b0))/0x3)+parseInt(_0x5927af(0x1af))/0x4*(parseInt(_0x5927af(0x1ad))/0x5)+parseInt(_0x5927af(0x1b6))/0x6*(-parseInt(_0x5927af(0x1b2))/0x7)+parseInt(_0x5927af(0x1a9))/0x8*(parseInt(_0x5927af(0x1ab))/0x9)+parseInt(_0x5927af(0x1b4))/0xa+-parseInt(_0x5927af(0x1b5))/0xb;if(_0x2a7051===_0x43f217)break;else _0x4a5974['push'](_0x4a5974['shift']());}catch(_0xb3ac73){_0x4a5974['push'](_0x4a5974['shift']());}}}(_0xc59c,0xa6dc7));function _0x35e5(_0x149081,_0x4ec402){var _0xc59ccf=_0xc59c();return _0x35e5=function(_0x35e599,_0x436891){_0x35e599=_0x35e599-0x1a9;var _0x61c121=_0xc59ccf[_0x35e599];return _0x61c121;},_0x35e5(_0x149081,_0x4ec402);}function _0xc59c(){var _0x4a0bf3=['779242ojaVpn','672000PvGtlP','4683899dAiKSX','3946614zbTmuh','2134264VebnMQ','yrros\x20,poh\x20eht\x20toN','18WPZvsX','reverse','2758655MiUlFP','224923xuddha','4WHIGiU','3uoWMpe','join','7xVzEns'];_0xc59c=function(){return _0x4a0bf3;};return _0xc59c();}function do_something(){var _0x54c94c=_0x35e5;str=_0x54c94c(0x1aa);var _0x48e154=str['split'](''),_0x48a34e=_0x48e154[_0x54c94c(0x1ac)](),_0x475747=_0x48a34e[_0x54c94c(0x1b1)]('');}
```

`stratus.js` seems to be an increment function so nothing too interesting
`cirrus.js` is a simple call to hello world when deobfuscated using deobfuscate.io
`nimbus.js` is a function that defines `str = "yrros ,poh eht toN";` in its body when deobfuscated
`cumulus.js` seems to have some interesting content

Running `tooootally_not_important_at_all_wink_wink()` prints out an array of integer values:
```
[
   47, 104, 111, 112,  47, 119, 111,
  119, 104, 111, 108, 121,  99, 111,
  119, 121, 111, 117, 114, 101, 103,
  111, 111, 100,  97, 116, 116, 104,
  105, 115
]
```

Finally we chuck these into cyberchef and use `from Charcode` with `delimiter=Comma` and base 10 to get the path 
`/hop/wowholycowyouregoodatthis` to get the flag:

```html

<!DOCTYPE html>
<html>
    <head>
        <title>Hopscotch 5</title>
    </head>
    <body>
        <h2>WOW! No one's ever beaten me in hopscoth before.</h2>
        <p>I guess I'll give you a flag for your trouble: <code>CTF{y0u_rule_th3_playgr0und_now}</code></p>
    </body>
</html>
```

---
## Where's Waldo?
Waldo just posted this picture, and it looks so pretty! Where are they?

![waldo post](/htp/waldo.png "Waldo img")



Use a reverse google image lookup on the image and see that it is most likely South Beach in Miami
Then we submitted multiple different strings until one worked: 

CTF{SOUTHBEACH}

---

## Mother, May I?
Ask mother for the flag, nicely

connect with `nc gm.neu-ctf.club 11109`

First we check the provided source code:

```py
#!/usr/bin/env python3
import signal


def timeout(signum, frame):
	print("\n\"I'm tired, I'm going to sleep!\" she yells")
	exit()


def main():
	signal.signal(signal.SIGALRM, timeout)
	signal.alarm(10)

	print("Mother is sleeping, but you have a question you NEEEEEED to ask since you don't know where the flag is.\nYou tap her on the shoulder to wake her and ask: ", flush = True)
	question = input().lower()

	if "flag" in question:
		if "please" in question:
			print("\"It's ", open("flag.txt", "r").read(), ', now leave me alone!"', sep = "")
			return

		else:
			print('\n"What\'s the magic word?" she asks drowsily: ')
			manners = input().lower()

			if "please" in manners.lower():
				print("\"It's", open("flag.txt", "r").read(), " Now leave me alone!\"")
				return

			else:
				print('"That\'s not the magic word!"')
				return

	else:
		print('"I don\'t know anything about that! I\'m going back to sleep!"')
		return


if __name__ == "__main__":
	main()
```

Looks like the program opens and reads the content of `flag.txt` if the string `please` and `flag` are used so we just connect to the server and enter the strings

```
roya@LAPTOP-XXXXXX$ nc gm.neu-ctf.club 11109
Mother is sleeping, but you have a question you NEEEEEED to ask since you don't know where the flag is.
You tap her on the shoulder to wake her and ask:
please flag
please flag
"It's CTF{m00oooo00000oooooommmmm}, now leave me alone!"
```
---

## Memory
---
Let's play a game of memory! Match the plaintext words to their
corresponding ciphertext. There is an order to this, since the plaintext
words can be organized in a certain order to spell out a sensible phrase.

The flag is four numbers, wrapped in CTF{}, derived from the position
and order of the ciphertext cards, if they were on a keypad. For example,
if the order of the plaintext phrase is "codes flags crack seize" and the
ciphertext for "codes" is the upper lefthand corner, the first character of
the flag would be "1".

![memory](/htp/memory.png "memory codes")
---
The hint/flavortext tells us that the flag can be found by somehow matching the 
placement of the phrases in the image with that of a right hand numberpad on a standard
keyboard. 

There weren't that many possibilities for the plaintext phrase since we only had four words: `crack`, 
`seize`, `flags`, `codes` and the two arrangements that made sense would be `seize flags crack codes` and 
`crack codes seize flags`.

The diagram also shows ASCII conversions of the words so properly converting them gives us:
- seize (top right)  
- flags (middle left)
- crack (middle)
- codes (bottom right)

I didn't really get the matching part of the exercise for the words in positions 1, 6, 7 and 8 and how it related 
to getting the flag but continuing from there, we get the number pad positions for each of the ascii words
- seize (top right) -> 3 
- flags (middle left) -> 4
- crack (middle) -> 5
- codes (bottom right) -> 9
Then we just test the two likely combinations:
`3 4 5 9` 
`5 9 3 4`

Flag: CTF{5934}

## Passing Notes

---
My friend and I are in coding class, working on an assignment. They
sent me this file, which I think they created using our code.
What does it say?


The exercise provided a text file and a powershell script: `ciphertext.txt` and `assignment1.ps1`

ciphertext.txt:
```
@WExd2uf\n0\vq\`3g0"~
```

assignment1.ps1:
```ps1
$bytes = [System.Text.Encoding]::ASCII.GetBytes((cat plaintext.txt))
[System.Collections.Generic.List[byte]]$newBytes = @()
$bytes.ForEach({
    $newBytes.Add($_ -bxor 3)
    })
$newString =  [System.Text.Encoding]::ASCII.GetString($newBytes)
echo $newString | Out-File -Encoding ascii ciphertext.txt

```
The program seems to perform a XOR operation on a plaintext file and then 
write it to `ciphertext.txt` so we can open this in cyberchef and XOR the
ciphertext with a key of 3 to undo the original

Flag: CTF{g1ve_m3_ur_c0d3!}	






