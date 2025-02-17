---
title: 'Creating a really simple EXIF Data Reader'
description: 'First Post'
pubDatetime: 2022-12-21T00:00:00Z
#heroImage: '/blog-placeholder-3.jpg'
---

Exchangeable Image File Format (EXIF) data is a way of storing specific metadata    inside an image file which can include records on the matter in which the photo was taken. Recorded metadata can include any camera settings used, time, date, location, and any other miscellaneous details regarding the image. 

Apparently this stuff has applications in OSINT and digital forensics so I wanted to see what it was about. 

So anyways, I wanted to create a really simple command line program in python that reads an image and simply outputs some basic stuff about an image. 

I did a quick google search initially and it seemed like exif data is primarily found in .jpg and .tiff files so I just ended up finding a [repository](https://github.com/ianare/exif-samples) on github with sample images that contain EXIF data to use.

To handle any image logic, I used the [Pillow Library](https://pillow.readthedocs.io/en/stable/) and for any command line stuff I used [argparse](https://docs.python.org/3/library/argparse.html) since it seemed like the easiest way to get it done. 

#### Command Line Stuff
So in order to actually use the program, I needed a way to run the python program and pass in flags or options so using `argparse` was pretty straight forward:
```py
import argparse

parser = argparse.ArgumentParser()

  
def set_arguments():
    INPUT_IMAGE_TEXT = "help-image"
    OUTPUT_FILE_TEXT = "output file name"
    DIRECTORY = "output directory, default is ./out"

    SEARCH_FLAG = "search general GPS location on maps"
    GPS_FLAG = ""
    
    parser.add_argument("-i", "--input-image", help=INPUT_IMAGE_TEXT)    
    parser.add_argument("-o", "--output-file", help=OUTPUT_FILE_TEXT)
    parser.add_argument("-d","--directory", help=DIRECTORY)
    
    parser.add_argument("-s", action="store_true", help=SEARCH_FLAG)
```
This way, I could run commands such as `python main.py -i .\jpg\Canon_40D.jpg` to pass the relative path of the image into the program and then use `PIL` or `os` to work with it. 

Now the main issue is just getting the exif data out of the input image and `PIL` happens to have an easy way to extract it into a map:
```py
 with PIL.Image.open(args.input_image) as input_image:
            # Exif data pulled here into a dict
            exif_data = input_image.getexif()

            # accumulate k,v pairs into array
            for(exif_tag, v) in exif_data.items():
               v_converted = str(v)
                formatted_line = string_formatter(Base(exif_tag).name, v_converted) 
                output_content += formatted_line 
```

Now running the same command again and printing out the array after joining, we can get some actual results:
```
GPSInfo              978
ResolutionUnit       2
ExifOffset           214
Make                 Canon
Model                Canon EOS 40D
Software             GIMP 2.4.5
Orientation          1
DateTime             2008:07:31 10:38:11
YCbCrPositioning     2
XResolution          72.0
YResolution          72.0
```
Of course, I'm sure there's definitely more stuff I could extract using the PIL library but these are some of the basic stuff you'd find

#### GPS Info
I also wanted to add the option of looking up the geolocation of an image if the exif data contained anything relevant so I first had to figure out how to extract GPS info using `PIL`. This was also a relatively straightforward task as you just check if the IFD for GPS info exists as a key in the extracted EXIF:

```py
GPS_EXISTS = (34853 in [k for k in exif_data.keys()])

if not(GPS_EXISTS):
     print(f"GPS Information does not exist for {args.input_image}")
    return      

if not(args.input_image):
            parser.error("--search requires --input-image")
else:
    # gets gps data and convert to readable keys
    gps_info = {GPSTAGS.get(tag, tag): value for tag,
                    value in exif_data.get_ifd(34853).items()}
    
    try: 
        latitude = gps_info["GPSLatitude"]
        longitude = gps_info["GPSLongitude"]
        latitude_ref = gps_info["GPSLatitudeRef"]
        longitude_ref = gps_info["GPSLongitudeRef"]
    
        geo_search(latitude, longitude, latitude_ref, longitude_ref)
    except:
        print("Not enough GPS info found")
```

Essentially after getting the values for the corresponding EXIF IFD (34853) for GPS Information, we just check if all four fields are present and then we can just make a query onto google maps with the field and then see where the image may have been taken. However, I did encounter an issue since if I remember correctly `PIL` kept giving me the GPS info in Degrees, Minutes, and Seconds (DMS) so querying that into google maps often did not give me consistent results so I had to convert them into degrees instead:

```py
import webbrowser as browser

GOOGLE_MAPS_URL = "https://www.google.com/maps"

# Unused URL encodings 
# DEGREE_ENCODING = "%C2%B0"
# DOUBLE_QUOTE_ENCODING = "%22"

# takes in lat/long tuples with reference points and then queries google maps
def geo_search(latitude:tuple, longitude:tuple, ref_a, ref_b):
    latitude_degree = latitude[0]
    latitude_minute = latitude[1]
    latitude_second = latitude[2] 
    
    longitude_degree = longitude[0]
    longitude_minute = longitude[1] 
    longitude_second = longitude[2]
    
    latitude_decimal = dms_to_decimal(latitude_degree, latitude_minute, latitude_second, ref_a)
    longitude_decimal = dms_to_decimal(longitude_degree, longitude_minute, longitude_second, ref_b)
    
    # combining url
    url_a = GOOGLE_MAPS_URL
    url_b = f"/@{latitude_decimal},{longitude_decimal},17z"
    
    browser.open(url_a + url_b)
 
 # convert from DMS to degrees
def dms_to_decimal(deg, min, sec, ref):
    # move rounding to string format later
    decimal_conversion = round(deg + (float(min)/60) + (float(sec)/3600), 6) 
    if ref in ["W", "S"]:
        decimal_conversion *= -1
    return decimal_conversion
```
After this was done, I was finally able to just call something up like `python main.py -i .\jpg\england-london-bridge.jpg -s` and then look up the relative location of the image's provided GPS info on google maps.

Honestly making this [script](https://github.com/royaboya/EXIFT) wasn't too overly complicated but there definitely is room for a lot improvement for things such as searching multiple files at a time, writing to the images, writing to an .xlsx file, cleaning up argparse, and many other things but maybe I'll look into that in the future if I come back to this.