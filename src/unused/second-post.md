---
title: 'Trying out Pwnable.kr'
description: 'First Post'
pubDate: 'Dec 22 2024'
heroImage: '/blog-placeholder-2.jpg'
---


#### fd

```
Mommy! what is a file descriptor in Linux?

* try to play the wargame your self but if you are ABSOLUTE beginner, follow this tutorial link:
https://youtu.be/971eZhMHQQw

ssh fd@pwnable.kr -p2222 (pw:guest)
```

It seems like the challenge had to deal with file descriptors in linux which I wasn't too familiar with so I looked it up
and they seem to be something along the lines of essentially being unsigned integers which are used as an identifier and
represents an opened file for the process. There are common file descriptors such as `0`, `1` and `2` which represent `stdin`,
`stdout`, and `stderr` respectively.

Running ls in the provided shell we get a few results:
```
fd@pwnable:~$ ls
fd  fd.c  flag
fd@pwnable:~$
```
- `fd` is a compiled setuid ELF 32-bit LSB executable
- `fd.c` is the source code
- `flag` is just a regular file that we don't have read access to

Opening `fd.c`, we get the following source code:
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
char buf[32];
int main(int argc, char* argv[], char* envp[]){
        if(argc<2){
                printf("pass argv[1] a number\n");
                return 0;
        }
        int fd = atoi( argv[1] ) - 0x1234;
        int len = 0;
        len = read(fd, buf, 32);
        if(!strcmp("LETMEWIN\n", buf)){
                printf("good job :)\n");
                system("/bin/cat flag");
                exit(0);
        }
        printf("learn about Linux file IO\n");
        return 0;

}
```
After looking at it for a little bit, it seems like what it's doing is taking in an argument from the command line and then uses it with an offset
to determine a value for a file descriptor. Then, it calls `read(int fd, void buf[.count], size_t count)` with the specified file descriptor, buffer, and buffer size
and prints out good job with the flag if whatever is stored at the buffer is equal to "LETMEWIN"

I Initially played around with a couple of random numbers: 
```
fd@pwnable:~$ ./fd 1000
learn about Linux file IO
fd@pwnable:~$ ./fd test
learn about Linux file IO
fd@pwnable:~$ ./fd 3000
learn about Linux file IO
fd@pwnable:~$ ./fd 4000
learn about Linux file IO
fd@pwnable:~$
```

But then I remembered there was an offset `0x1234` which is equivalent to 4660 in decimal:
```
fd@pwnable:~$ ./fd 4660
test
learn about Linux file IO
fd@pwnable:~$
```
It seemed like now, the program was expecting to read some input from the command line... So I tried a few other numbers:
```
fd@pwnable:~$ ./fd 4661
test 4661
learn about Linux file IO
fd@pwnable:~$ ./fd 4662
test 4662
learn about Linux file IO
fd@pwnable:~$ ./fd 4663
learn about Linux file IO
fd@pwnable:~$
```
From this, it seemed like the values `4660`, `4661`, `4662` all cause the program to read some input... Interesting, as after
subtracting the offset, they correspond to the `0`, `1`, and `2` file descriptors earlier, this probably means that we have successfully
called read() and it was just waiting for some input to be stored into the buffer so after this we pass in `LETMEWIN` and get the flag: 

```
fd@pwnable:~$ ./fd 4660
LETMEWIN
good job :)
mommy! I think I know what a file descriptor is!!
fd@pwnable:~$
```

#### collision