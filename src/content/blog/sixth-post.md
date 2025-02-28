---
title: Snyk Fetch the Flag Writeups
description: 'Snyk CTF Challenges'
pubDatetime: 2025-02-27T00:00:00Z
---

![Snyk Fetch The Flag](/snyk/snyk.png "Snyk CTF") 

Writeups for some of the challenges from the Snyk Fetch the Flag event that we solved

# Warmups
---
## Read the Rules - [Easy] 
> Please follow the rules for this CTF! 

A simple warmup, the flag was posted in the page source of the rules page:
```html
<!-- Thank you for reading the rules! Your flag is: -->
<!--   flag{90bc54705794a62015369fd8e86e557b}       -->
```

**Flag**: flag{90bc54705794a62015369fd8e86e557b} 

## Technical Support - [Easy]

>Want to join the party of GIFs, memes and emoji shenanigans? Or just want to ask a question for technical support regarding any challenges in the CTF? 
> 
>This CTF uses support tickets to help handle requests. If you need assistance, please create a ticket with the #open-help-ticket channel. You do not need to direct message any CTF organizers or facilitators, they will just tell you to open a ticket. You might find a flag in the ticket channel, though!


Warmup Flag, the flag is in #open-help-ticket.

**Flag**: flag{d7aa66ea0edd20221820c84ecc47aee9}


## CTF 101 - [Easy]
---
>If you are new to CTFs, start here!
>
>Welcome to the CTF 101 challenge for the Snyk Fetch the Flag 2025 CTF! This challenge serves as an introduction to familiarize players with how the game works. It presents players with a simple challenge that emulates the challenges they will see on game day.
>Hopefully after you've completed this challenge, you'll be able to say that game day is "just like the simulations!"


Use the Dockerfile to run a local instance of the challenge! To build and the container, unzip the contents of the challenge.zip file and run:
docker build -t [challenge_name] . && docker run -it -p 5000:5000 [challenge_name]

Press the Start button on the top-right to begin this challenge.


### Screaming Crying Throwing Up - [Easy]
>Or some xkcd cipher like that.

The provided `scream.txt` provides us with some text:  

a̮ăaa̋{áa̲aȧa̮ȧaa̮áa̲a̧ȧȧa̮ȧaa̲a̧aa̮ȧa̲aáa̮a̲aa̲a̮aaa̧} 

The flavor text hints at xkcd so we can look up the Scream Cipher and manually convert the ciphertext--or just use an [online converter](https://scream-cipher.netlify.app/) to get the flag.

**Flag**: flag{edabfbafedcbbfbadcafbdaefdadfaac}

### Science 100 - [Easy]
>Patrolling the Mojave almost makes you wish for a nuclear winter.
>
>Press the Start button on the top-right to begin this challenge.

This is a fire reference to terminal hacking in the Fallout Series, it's like wordle but in a 1970s terminal.
```
roya@LAPTOP-EGQVCHJB:/mnt/c/Windows/system32$ nc challenge.ctf.games 32553
Welcome to Robco Industries (TM) Termlink
>SET TERMINAL/INQUIRE

RIT-V300
>SET FILE/PROTECTION=OWNER:RWED ACCOUNTS.F
>SET HALT RESTART/MAINT
0xF4F0  ({]/(+.%:}}!  0xF5F0  %(<<,?))&>)%
0xF4FC  {[]!$}(,_}##  0xF5FC  $/!!^!/-*(+!
0xF508  ^#<$@FORGE.<  0xF608  {_!#;}%,/,+/
0xF514  =<|@=^{=:=:>  0xF614  $@^]$/+}?-|_
0xF520  (]@!.{=#%<;)  0xF620  $<[*|/!SOLVE
0xF52C  ^/$%$.^]_$_=  0xF62C  <(:}=>&{,;-!
0xF538  ${![?}(@}&;^  0xF638  )}[!^&#-!][%
0xF544  >-?+*|}!,,]*  0xF644  [.@}&GUILT>?
0xF550  %(#;|BACON),  0xF650  (=>%./+^})#*
0xF55C  :-^+%{.#@@%:  0xF65C  *<)|!,*-;;_#
0xF568  )>?!;#(/=_:#  0xF668  }+.@]:+FORCE
0xF574  -</=_}*_?&^>  0xF674  ?>^]|-/@$)-!
0xF580  ?%^/!TRAIT__  0xF680  {^+<_#.!|}|@
0xF58C  ^:)^?:}*^@?}  0xF68C  ]#+^(_);+<+?
0xF598  ATTIC%@]%!--  0xF698  *}}SIGHT|:<&
0xF5A4  )##}/-(.=.^)  0xF6A4  -+;/]<&}&*=)
[!] ATTEMPTS REMAINING: 4
> FORGE
ENTRY DENIED. LIKENESS: 0/5
[!] ATTEMPTS REMAINING: 3
> TRAIT
ENTRY DENIED. LIKENESS: 1/5
[!] ATTEMPTS REMAINING: 2
> SIGHT
[!] ACCESS GRANTED
Robco Industries Termlink (TM) Mail Protocol
Initiated
User: j.hammond@robcoindustries.org
INBOX
1) h.hacks@robcoindustries.org SUBJ: new CTF game
idea
2) flag.txt
3) Paella
 recipe
Select an option (1, 2, or 3): 2
flag.txt
flag{89e575e7272b07a1d33e41e3647b3826}
```

**Flag**: flag{89e575e7272b07a1d33e41e3647b3826}

### Zero Ex Six One - [Easy]
>I'm XORta out of ideas for how to get the flag. Does this look like anything to you?

The provided `flag.txt.encry` provided some text: 
```
0x070x0d0x000x060x1a0x020x540x510x050x590x530x020x510x000x530x540x070x520x040x570x550x550x050x510x560x510x530x030x550x500x050x030x050x510x590x540x000x1c
```

Using Cyberchef, we apply `FROM Hex` and `XOR Brute Force` and find that a key of 61 gives us the flag.

**Flag**: flag{c50d82c0a25f3e644d0702b41dbd085a}


# Reverse Engineering
---
## An Offset Amongst Friends - [Easy]
> What's a little offset amongst friends? 

Provided file: `an-offset`,  ELF 64-bit LSB pie executable, x86-64,

Throwing the binary into a decompiler, we can see some functions: 

```c
void FUN_001011c9(long param_1)

{
  long in_FS_OFFSET;
  int local_3c;
  char local_38 [40];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  builtin_strncpy(local_38,"gmbh|d65426593642d22b87bfbb939f54918d~",0x27);
  for (local_3c = 0; local_38[local_3c] != '\0'; local_3c = local_3c + 1) {
    *(char *)(param_1 + local_3c) = local_38[local_3c] + -1;
  }
  *(undefined *)(param_1 + local_3c) = 0;
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    // WARNING: Subroutine does not return
    __stack_chk_fail();
  }
  return;
}


void FUN_0010128e(long param_1)

{
  long in_FS_OFFSET;
  int local_24;
  char local_1e [14];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  builtin_strncpy(local_1e,"vompdl`nf`234",0xe);
  for (local_24 = 0; local_1e[local_24] != '\0'; local_24 = local_24 + 1) {
    *(char *)(param_1 + local_24) = local_1e[local_24] + -1;
  }
  *(undefined *)(param_1 + local_24) = 0;
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    // WARNING: Subroutine does not return
    __stack_chk_fail();
  }
  return;
}

```
There's two interesting strings, gmbh|d65426593642d22b87bfbb939f54918d~ and vompdl`nf`234. When we brute force `ROT13`, we see that we get flag|c65426593642c22a87aeaa939e54918c~ and  unlock\`me\`234 with a key of 25. However, obviously the strings we have right now don't particularly match the flag format and flag|c65426593642c22a87aeaa939e54918c~ doesn't seem to be the correct flag, however, we can take a guess as to what the expected input is which in this case is unlock_me_123 as the non-alphabetical characters in the password string have not been changed. 

```
roya@LAPTOP-XXXXXX:/mnt/c/CTFs/Snyk$ ./an-offset
Enter the password: unlock_me_123
Correct! Here's your flag: flag{c54315482531c11a76aeaa828e43807c}
```

**Flag**: flag{c54315482531c11a76aeaa828e43807c}

## A Powerful Shell - [Easy]
>How can a SHELL have so much POWER?!

Provided File: `challenge.ps1`

We're given a powershell script with the contents: 
```ps1
# Check if being debugged
if ($PSDebugContext) {
    Write-Output "No debugging allowed!"
    exit
}

# Embedded and encoded layer 2
$encoded = "JGRlY29kZWQgPSBbU3lzdGVtLkNvbnZlcnRdOjpGcm9tQmFzZTY0U3RyaW5nKCdabXhoWjNzME5XUXlNMk14WmpZM09EbGlZV1JqTVRJek5EVTJOemc1TURFeU16UTFObjA9JykNCiRmbGFnID0gW1N5c3RlbS5UZXh0LkVuY29kaW5nXTo6VVRGOC5HZXRTdHJpbmcoJGRlY29kZWQpDQoNCiMgT25seSBzaG93IGZsYWcgaWYgc3BlY2lmaWMgZW52aXJvbm1lbnQgdmFyaWFibGUgaXMgc2V0DQppZiAoJGVudjpNQUdJQ19LRVkgLWVxICdTdXAzclMzY3IzdCEnKSB7DQogICAgV3JpdGUtT3V0cHV0ICRmbGFnDQp9IGVsc2Ugew0KICAgIFdyaXRlLU91dHB1dCAiTmljZSB0cnkhIEJ1dCB5b3UgbmVlZCB0aGUgbWFnaWMga2V5ISINCn0="
$bytes = [Convert]::FromBase64String($encoded)
$decodedScript = [System.Text.Encoding]::UTF8.GetString($bytes)

# Execute with specific arguments
$argumentList = "-NoProfile", "-NonInteractive", "-Command", $decodedScript

# Start new PowerShell process
$startInfo = New-Object System.Diagnostics.ProcessStartInfo
$startInfo.FileName = "powershell.exe"
$startInfo.Arguments = $argumentList -join ' '
$startInfo.RedirectStandardOutput = $true
$startInfo.RedirectStandardError = $true
$startInfo.UseShellExecute = $false
$startInfo.CreateNoWindow = $true

$process = New-Object System.Diagnostics.Process
$process.StartInfo = $startInfo
$process.Start() | Out-Null
$output = $process.StandardOutput.ReadToEnd()
$process.WaitForExit()

Write-Output $output
```

There's not a whole lot going on but we can see base64 encoded strings so if we decode `$encoded` we get more powershell: 

```ps1
$decoded = [System.Convert]::FromBase64String('ZmxhZ3s0NWQyM2MxZjY3ODliYWRjMTIzNDU2Nzg5MDEyMzQ1Nn0=')
$flag = [System.Text.Encoding]::UTF8.GetString($decoded)

# Only show flag if specific environment variable is set
if ($env:MAGIC_KEY -eq 'Sup3rS3cr3t!') {
    Write-Output $flag
} else {
    Write-Output "Nice try! But you need the magic key!"
}
```

If we decode the string `ZmxhZ3s0NWQyM2MxZjY3ODliYWRjMTIzNDU2Nzg5MDEyMzQ1Nn0=` we get the flag: `flag{45d23c1f6789badc1234567890123456}`.

I'm somewhat sure we could probably get the key as well if we supply an env with the value `Sup3rS3cr3t!` but looks like we don't need to do that. 

**Flag**: flag{45d23c1f6789badc1234567890123456}

## String Me Along - [Easy]
>String me right along!

Provided file: `string-me-along`, ELF 64-bit LSB pie executable

Chuck it into Ghidra to get: 
```c
undefined8 main(void)

{
  int iVar1;
  long in_FS_OFFSET;
  undefined8 local_78;
  undefined8 local_70;
  undefined8 local_68;
  undefined7 local_60;
  undefined uStack_59;
  undefined7 uStack_58;
  char local_48 [56];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  local_78 = 0x3035387b67616c66;
  local_70 = 0x6261393261316564;
  local_68 = 0x6461356536623035;
  local_60 = 0x62343333383539;
  uStack_59 = 0x36;
  uStack_58 = 0x7d6662356438;
  puts("Welcome to the first RE challenge!");
  printf("Enter the password: ");
  __isoc99_scanf(&DAT_00102040,local_48);
  iVar1 = strcmp(local_48,"unlock_me_123");
  if (iVar1 == 0) {
    printf("Correct! Here\'s your flag: %s\n",&local_78);
  }
  else {
    puts("Wrong password! Try again.");
  }
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    // WARNING: Subroutine does not return
    __stack_chk_fail();
  }
  return 0;
}
```

Seems like it's doing a string comparison in main after writing into a buffer from standard input with `local_48` to see if the password is `unlock_me_123` so we can just pass that into the binary and get the flag. 

```
roya@LAPTOP-XXXXXXXX:/mnt/c/CTFs$ ./string-me-along
Welcome to the first RE challenge!
Enter the password: unlock_me_123
Correct! Here's your flag: flag{850de1a29ab50b6e5ad958334b68d5bf} 
```
**Flag**: flag{850de1a29ab50b6e5ad958334b68d5bf}

## Either Or - [Medium]
>Either or, but probably not both.

Provided File: `either-or`

Uploading the file into Ghidra, we can take a look at some function assumptions: 

```c
void decode_flag(long param_1)

{
  long in_FS_OFFSET;
  uint local_3c;
  byte local_38 [40];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  local_38[0] = 0x24;
  local_38[1] = 0x72;
  local_38[2] = 0x75;
  local_38[3] = 0x76;
  local_38[4] = 0x26;
  local_38[5] = 0x71;
  local_38[6] = 0x7a;
  local_38[7] = 0x7b;
  local_38[8] = 0x71;
  local_38[9] = 0x70;
  local_38[10] = 0x73;
  local_38[0xb] = 0x74;
  local_38[0xc] = 0x76;
  local_38[0xd] = 0x20;
  local_38[0xe] = 0x70;
  local_38[0xf] = 0x75;
  local_38[0x10] = 0x7a;
  local_38[0x11] = 0x23;
  local_38[0x12] = 0x77;
  local_38[0x13] = 0x72;
  local_38[0x14] = 0x7a;
  local_38[0x15] = 0x26;
  local_38[0x16] = 0x24;
  local_38[0x17] = 0x73;
  local_38[0x18] = 0x73;
  local_38[0x19] = 0x20;
  local_38[0x1a] = 0x77;
  local_38[0x1b] = 0x27;
  local_38[0x1c] = 0x24;
  local_38[0x1d] = 0x24;
  local_38[0x1e] = 0x7a;
  local_38[0x1f] = 0x7b;
  for (local_3c = 0; local_3c < 0x20; local_3c = local_3c + 1) {
    *(byte *)(param_1 + (int)local_3c) = local_38[(int)local_3c] ^ 0x42;
  }
  *(undefined *)(param_1 + 0x20) = 0;
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    // WARNING: Subroutine does not return
    __stack_chk_fail();
  }
  return;
}



void encode_input(long param_1,long param_2)

{
  int iVar1;
  undefined4 local_c;
  
  for (local_c = 0; *(char *)(param_1 + local_c) != '\0'; local_c = local_c + 1) {
    if ((*(char *)(param_1 + local_c) < 'a') || ('z' < *(char *)(param_1 + local_c))) {
      if ((*(char *)(param_1 + local_c) < 'A') || ('Z' < *(char *)(param_1 + local_c))) {
        *(undefined *)(param_2 + local_c) = *(undefined *)(param_1 + local_c);
      }
      else {
        iVar1 = *(char *)(param_1 + local_c) + -0x34;
        *(char *)(param_2 + local_c) = (char)iVar1 + (char)(iVar1 / 0x1a) * -0x1a + 'A';
      }
    }
    else {
      iVar1 = *(char *)(param_1 + local_c) + -0x54;
      *(char *)(param_2 + local_c) = (char)iVar1 + (char)(iVar1 / 0x1a) * -0x1a + 'a';
    }
  }
  *(undefined *)(param_2 + local_c) = 0;
  return;
}


undefined8 main(void)

{
  int iVar1;
  long in_FS_OFFSET;
  char local_d8 [80];
  char local_88 [64];
  undefined local_48 [56];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  builtin_strncpy(local_d8,"frperg_cnffjbeq",0x10);
  puts("Welcome to the Encoding Challenge!");
  printf("Enter the secret word: ");
  __isoc99_scanf(&DAT_00102043,local_d8 + 0x10);
  encode_input(local_d8 + 0x10,local_88);
  iVar1 = strcmp(local_88,local_d8);
  if (iVar1 == 0) {
    decode_flag(local_48);
    printf("Well done! Here\'s your flag: flag{%s}\n",local_48);
  }
  else {
    puts("Not quite right. Keep trying!");
  }
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    // WARNING: Subroutine does not return
    __stack_chk_fail();
  }
  return 0;
}
```

In `main()` the program is probably reading a buffer and comparing it to `frperg_cnffjbeq` after they're both encoded. It looks like a rot13 so we can just rot13 brute force on cyberchef for the password.

Using a rot13 with a key of 13, we can see that the text comes out to `secret_password` and passing that into the executable gives us the flag. 

```
roya@LAPTOP-EGQVCHJB:/mnt/c/CTFs/Snyk Fetch the Flag 2025 BACKUP PLAN/Either Or$ ./either-or
Welcome to the Encoding Challenge!

Enter the secret word: secret_password                                                                                                                       
Well done! Here's your flag: flag{f074d38932164b278a508df11b5eff89} 
```

**Flag**: flag{f074d38932164b278a508df11b5eff89}


## Math For Me - [Medium]
>Just gotta do some math!

Provided File: `math4me`

Uploading into Ghidra again, we can see two useful parts of the program:

```c 

bool check_number(int param_1)

{
  return (param_1 * 5 + 4) / 2 == 0x34;
}

undefined8 main(void)

{
  int iVar1;
  long in_FS_OFFSET;
  undefined4 local_50;
  int local_4c;
  undefined local_48;
  undefined local_47;
  undefined local_46;
  undefined local_45;
  undefined local_44;
  undefined local_23;
  undefined local_22;
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  puts("Welcome to the Math Challenge!");
  printf("Find the special number: ");
  __isoc99_scanf(&DAT_00102049,&local_50);
  local_48 = 0x66;
  local_47 = 0x6c;
  local_46 = 0x61;
  local_45 = 0x67;
  local_44 = 0x7b;
  iVar1 = check_number(local_50);
  if (iVar1 == 0) {
    puts("That\'s not the special number. Try again!");
  }
  else {
    for (local_4c = 5; local_4c < 0x25; local_4c = local_4c + 1) {
      compute_flag_char(&local_48,local_4c,local_50);
    }
    local_23 = 0x7d;
    local_22 = 0;
    printf("Congratulations! Here\'s your flag: %s\n",&local_48);
  }
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    // WARNING: Subroutine does not return
    __stack_chk_fail();
  }
  return 0;
}
```
Seems like as long as we get the correct value returned for `check_number()` we'll get the decoded flag, so to figure that out, we can just do some algebra to figure out what the expected input is.

In `(param_1 * 5 + 4) / 2 == 0x34`, 0x34 is 52 in decimal, then we multiply that by 2 to get 104, then subtract 4 to get 100, then divide by 5 to get 20. Then we submit to get the flag.

```
roya@LAPTOP-EGQVCHJB:/mnt/c/CTFs/Snyk/Math for Me$ ./math4me
Welcome to the Math Challenge!
Find the special number: 20
5: 26: -3
7: 1
8: 4
9: -2
10: 1
11: 3
12: -2
13: 4
14: -1
15: 2
16: -3
17: 1
18: 4
19: -2
20: 1
21: 3
22: -2
23: 4
24: -1
25: 2
26: -3
27: 1                                                                                                                                                        
28: 4                                                                                                                                                        
29: -2                                                                                                                                                       
30: 1                                                                                                                                                        
31: 3                                                                                                                                                        
32: -2                                                                                                                                                       33: 4                                                                                                                                                        34: -1                                                                                                                                                       35: 2                                                                                                                                                        36: -3                                                                                                                                                       
Congratulations! Here's your flag: flag{h556cdd`=ag.c53664:45569368391gc} 
```
**Flag**: flag{h556cdd`=ag.c53664:45569368391gc} 

## letters2nums - [Medium]
>This is Letters2Nums, a new data encryption format I came up with. Use the attached binary to figure out how to decrypt the encoded flag.

Provided Files: `encflag.txt`, `letters2num.elf`

Opening `encflag.txt`, we see a bunch of numbers: 
```
21608
26995
8297
29472
24864
27759
28263
8289
28260
8291
28526
30319
27765
25701
25632
30561
31008
29807
8308
29305
8289
28260
8296
26980
25888
29800
25888
26220
24935
14963
27243
24938
25707
24947
27236
24947
27498
25715
24939
27146
```

As per usual, we open the ELF in ghidra and I'm just going to include all of the useful/somewhat related functions down below:

```c
uint encodeChars(char param_1,char param_2)

{
  return CONCAT22(param_1 >> 7,(short)param_2) | (int)param_1 << 8;
}

ulong sl(char *param_1,uint param_2)

{
  ulong uVar1;
  
  if (*param_1 == '\0') {
    uVar1 = (ulong)param_2;
  }
  else {
    uVar1 = sl(param_1 + 1,param_2 + 1);
  }
  return uVar1;
}

int c(void *param_1,void *param_2)

{
  long in_RDX;
  char *local_28;
  char *local_20;
  int local_c;
  
  local_c = 0;
  local_20 = (char *)param_1;
  while (local_28 = (char *)param_2, *local_20 != '\0') {
    *(char *)(in_RDX + local_c) = *local_20;
    local_20 = local_20 + 1;
    local_c = local_c + 1;
  }
  while (*local_28 != '\0') {
    *(char *)(in_RDX + local_c) = *local_28;
    local_28 = local_28 + 1;
    local_c = local_c + 1;
  }
  *(undefined *)(in_RDX + local_c) = 0;
  return (int)(undefined *)(in_RDX + local_c);
}

undefined8 writeFlag(char *param_1,long param_2)

{
  short sVar1;
  int iVar2;
  FILE *__stream;
  int local_18;
  
  __stream = fopen(param_1,"w");
  iVar2 = sl(param_2,0);
  if (__stream == (FILE *)0x0) {
    puts("Error opening file.");
  }
  else {
    for (local_18 = 0; local_18 < iVar2; local_18 = local_18 + 2) {
      sVar1 = encodeChars((int)*(char *)(param_2 + local_18),
                          (int)*(char *)(param_2 + (long)local_18 + 1));
      fprintf(__stream,"%d\n",(ulong)(uint)(int)sVar1);
    }
    fclose(__stream);
  }
  return 0;
}

undefined8 main(void)

{
  long in_FS_OFFSET;
  undefined local_148 [48];
  undefined local_118 [264];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  readFlag("flag.txt",local_148);
  c("This is a long and convoluded way to try and hide the flag:",local_148);
  writeFlag("encflag.txt",local_118);
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    // WARNING: Subroutine does not return
    __stack_chk_fail();
  }
  return 0;
}
```

In `main()` it seems like we're supposed to supply a `flag.txt` with a flag so that it can read the contents and call `c() after storing the flag into a buffer. 
Then, `c()` takes a hardcoded string and the stored buffer and it seems to do something with string appending/concatenation although I haven't looked too closely.
The important part is the next line, `writeFlag()` which seems to write to the encrypted flag file. 

In the else branch of `writeFlag()` after the file has been opened in write mode, we can see a call to `encodeChars()` which takes two `chars` and performs a bit shift right and left 
before combining them which seems to be the underlying implementation of the contente in `encflag.txt`. To reverse this, we need to extract the higher 8 bits from param1, extract the lower 8 bits from param2, combine them, and 
get the character encoding. 

```py
def reverse_encode(value):
    param_1_high = (value >> 8) & 0xFF
    param_2 = value & 0xFF 
    param_1_low = param_1_high >> 7
    param_1 = (param_1_low << 7) | param_1_high

    return chr(param_1), chr(param_2)


values = [21608,26995,8297,29472,24864,27759,28263,8289,28260,8291,28526,30319,27765,25701,25632,30561,
31008,29807,8308,29305,8289,28260,8296,26980,25888,29800,25888,26220,24935,14950,27745,26491,13154,12341,
12390,13665,14129,13925,13617,25400,14693,14643,12851,25185,26163,24887,25143,13154,32000]

reversed_values = [reverse_encode(value) for value in values]

string = ""
for tup in reversed_values:
    string += "".join(tup)
    
print(string)
```
>This is a long and convoluded way to try and hide the flag:flag{3b050f5a716e51c89e9323baf3a7b73b}

**Flag**: flag{3b050f5a716e51c89e9323baf3a7b73b}

# Thoughts & Takeaways
This CTF was pretty fun besides the fact that the website started going down about an hour or two towards the beginning of the CTF... 
I'm sure our team could've solved some more challenges but we all had class later on in the day but it was a pretty good learning experience. Also I need to get better at solving web challenges...

![Certificate of Completion](/snyk/team.png "Certification of completion")