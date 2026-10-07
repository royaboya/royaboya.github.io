---
title: "pwnable.kr (web, easy)"
description: "walkthrough for any pwnable kr challenges"
pubDate: 2026-09-24
event: "pwnable kr"
category: "web"
difficulty: "easy"
tags: ["memory?"]
---

---
## Collsion 
Daddy told me about cool MD5 hash collision today.
I wanna do something like that too!

```c
> cat col.c
#include <stdio.h>
#include <string.h>
unsigned long hashcode = 0x21DD09EC;
unsigned long check_password(const char* p){
        int* ip = (int*)p;
        int i;
        int res=0;
        for(i=0; i<5; i++){
                res += ip[i];
        }
        return res;
}

int main(int argc, char* argv[]){
        if(argc<2){
                printf("usage : %s [passcode]\n", argv[0]);
                return 0;
        }
        if(strlen(argv[1]) != 20){
                printf("passcode length should be 20 bytes\n");
                return 0;
        }

        if(hashcode == check_password( argv[1] )){
                setregid(getegid(), getegid());
                system("/bin/cat flag");
                return 0;
        }
        else
                printf("wrong passcode.\n");
        return 0;
}
```

We have a password function that reads 20 chars and returns the summed up value. Then, in main we get the flag if it's equal to the hashcode and it only accepts passwords of exactly 20 bytes. 

Given the hexcode `0x21DD09EC`, can convert that to decimal to understand it better -> 568134124

Pwnable.kr runs on a 32-bit ubuntu setup so bytes are read in little endian mode and because the function reads in unsigned longs, it interprets the memory in 4 byte chunks.

We divide 568134124 by 5 to get 113626824.8 and we can either round up or round down but it does not really matter. If we round down, we have 113626824 (0x6C5CEC8 in hex). Then, we have to find how much we need to add to (0x6C5CEC8 * 4) to get 568134124 and to fulfill the 20 byte requirement. Thus, 568134124 - (113626824 * 4) = 113626828 (0x6C5CECC in hex). We can also verify this in python:
```
>>> (0x6C5CEC8 * 4) + 0x6C5CECC
568134124
```

Then we can just build our input using little endian format and python to send it in individual bytes:
`./col "$(python3 -c 'import sys; sys.stdout.buffer.write(b"\xc8\xce\xc5\x06"*4 + b"\xcc\xce\xc5\x06")')"`