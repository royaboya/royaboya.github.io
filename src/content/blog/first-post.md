---
title: 'Creating a really simple EXIF Data Reader'
description: 'First Post'
pubDatetime: 2024-12-21T00:00:00Z
heroImage: '/exif.png'
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

Honestly making this [script](https://github.com/royaboya/EXIFT) wasn't too overly complicated but there definitely is room for improvement. 

# Updating the EXIF Reader (2/11/2025)

So anyways, I wanted to add some more functionality to the exif script, some of which included:
- Adding an option to dump the key value mappings of the EXIF and GPS data into a json file
- Displaying the GPS data in conjunction with the original exif and file details
- Adding an option to explain the different exif tags
Also I wanted to clean up some of the code a little if possible

#### Adding argparse groups
Adding the options and flags into argparse was quite messy so they were separated into different argument groups based on what kind of general function they provided:
```py
def set_arguments():
    ...
    # Create an input group for any inputs, so far there is only image which is a required one
    input_group = parser.add_argument_group(title="input options")
    input_group.add_argument("-i", "--input-image", help=INPUT_IMAGE_TEXT, required=True)    
    
    # Output group which is just any outputs that we'd want to create
    output_group = parser.add_argument_group(title="output options")
    output_group.add_argument("-j", "--json", help=JSON) # pass in file name
    output_group.add_argument("-o", "--output-file", help=OUTPUT_FILE_TEXT) # pass in file name
    output_group.add_argument("-d","--directory", help=DIRECTORY) # pass in directory, although has limited functionality
    
    # GPS group which just has anything related to GPS EXIF
    gps_group = parser.add_argument_group(title="gps options")
    gps_group.add_argument("-s", "--search", action="store_true", help=SEARCH_FLAG)
    gps_group.add_argument("-g", "--gps", action="store_true", help=GPS_FLAG)
    
    # Other actions
    miscellaneous_group = parser.add_argument_group(title="miscellaneous")
    miscellaneous_group.add_argument("-e", "--explanation",action="store_true", help=EXPLANATION)

```
Using argument groups, these different flags and options could be separated based on their behavior, argparse also conveniently separates them when calling `-h` which is very helpful

#### Json Dumps
After cleaning up the code a little bit, I wanted to add the option of dumping to a JSON file,
an example command would be like:  
`python main.py -i [image_path] -j [json_file_name] -g`  
which in theory is supposed to collect the EXIF data, GPS data, and then output that into a .json file with the given name in a pre-made directory `json_dumps`. I didn't want to handle user inputted directories since I didn't want to include other high-level modules to handle it and it wasn't the main focus of learning for this script, but in theory, that could easily be an option.

First, I had to handle what to do when the user passes in a file name for the .json (after providing a required path for a jpg):  
```py
    if args.json:
        if not(args.json.endswith(".json")):
            dump_to_json(f"json_dumps/{args.json}.json", json_output)
        else:
            dump_to_json(f"json_dumps/{args.json}", json_output)
        
        print(f"Dumped Contents into /json_dumps/{args.json}.json")
```

Essentially, the `json` module has a very useful `dump()` method which helps in creating a JSON dump onto a file:
```py
def dump_to_json(path:str, dict_data) -> None:
    """Attempts to output the exif data into a .json"""
    try:
        with open(path, "w") as out:
            json.dump(dict(dict_data), out, default=json_serializable, indent=4)
    except:
        print(f"There was an error trying to write to {path}")
```
This just tries to open a path and write the contents of the EXIF data (from a dict) into a file, the indent is 4 so that
the content is actually spaced out properly in the output and actually readable, and `json_serializable` is just some function
I used to handle any serialiazing problems that `dump()` kept giving me whenever I was passing in the EXIF dicts.
```py
def json_serializable(obj):
    if isinstance(obj, IFDRational):
        return float(obj)
    elif isinstance(obj, bytes):
        return str(obj)  
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")
```  
I also had to use something like a dict buffer, `exif_json_tmp` to handle creating dictionaries since I wanted to write out JSON files in the form of: 
```json
{
    "filename": 
    {
        "EXIF content here":0,

        "GPS":"gps content"

    }

}
```
Because of this, I had to create another method `make_file_dict()` as a helper in this but I am sure there is definitely a better way to do this since I still felt like this was a pretty messy way to handle JSON dumps since I also had to clear the buffer every single time.  

Finally, testing with sample images provided a sample output in `./json_dumps/`:  
```json
{
    "england-london-bridge.jpg": {
        "ImageWidth": 4032,
        "ImageLength": 3024,
        "GPSInfo": 20464,
        "ResolutionUnit": 2,
        "ExifOffset": 241,
        "Make": "Google",
        "Model": "Pixel 2",
        "Software": "HDR+ 1.0.199571065z",
        "Orientation": 1,
        "DateTime": "2018:08:22 13:13:41",
        "YCbCrPositioning": 1,
        "XResolution": 72.0,
        "YResolution": 72.0
    },
    "GPS": {
        "GPSVersionID": "b'\\x02\\x02\\x00\\x00'",
        "GPSLatitudeRef": "N",
        "GPSLatitude": [
            51.0,
            30.0,
            14.78
        ],
        "GPSLongitudeRef": "W",
        "GPSLongitude": [
            0.0,
            4.0,
            28.47
        ],
        "GPSAltitudeRef": "b'\\x00'",
        "GPSAltitude": 77.88,
        "GPSTimeStamp": [
            12.0,
            13.0,
            40.0
        ],
        "GPSDOP": 11.965,
        "GPSProcessingMethod": "b'ASCII\\x00\\x00\\x00fused'",
        "GPSDateStamp": "2018:08:22"
    }
}
```



#### Adding explanations to EXIF Tags
There are a [lot](https://exiftool.org/TagNames/EXIF.html) of exif tags so I wanted to add an option `-e` to help add some context into each tag displayed. To do this, it was pretty much just creating a separate `dict` that contains all of the mapping definitions for each exif tag name and then its definition as a value, because there's just so many, I had chatGPT make some for me: 
```py
# exif_explanations.py
EXIF_TAG_INFO = {
    "ImageWidth": "Width of the image in pixels",
    "ImageLength": "Length of the image in pixels",
    "GPSInfo": "EXIF Offset which points to the sub image file directory",
    "ResolutionUnit": "Units of measurement for XResolution and YResolution",
    "ExifOffset": "Pointer to EXIF-specific data",
    "Make": "Manufacturer of the camera",
    "Model": "Camera model",
    "Software": "Software used to process the image",
    "Orientation": "Orientation of the image",
    "DateTime": "Date and time when the image was last modified",
    "YCbCrPositioning": "Positioning of the Y and CbCr components",
    "XResolution": "Number of pixels per ResolutionUnit in the X direction",
    "YResolution": "Number of pixels per ResolutionUnit in the Y direction",
    "GPSVersionID": "Version of the GPS information format",
    "GPSLatitudeRef": "Latitude reference (N or S)",
    "GPSLatitude": "Latitude of the image",
    "GPSLongitudeRef": "Longitude reference (E or W)",
    "GPSLongitude": "Longitude of the image",
    "GPSAltitudeRef": "Altitude reference (0 = sea level, 1 = above sea level)",
    "GPSAltitude": "Altitude of the image location",
    "GPSTimeStamp": "Time of GPS fix (in UTC)",
    "GPSDOP": "Degree of precision for the GPS data",
    "GPSProcessingMethod": "Method used for GPS location finding",
    "GPSDateStamp": "Date of GPS fix",
    "Flash": "Indicates whether the flash fired",
    "FocalLength": "Focal length of the lens, in millimeters",
    "ExposureTime": "Exposure time, in seconds",
    "FNumber": "F-number (aperture)",
    "ISOSpeedRatings": "ISO speed setting used during capture",
    "ShutterSpeedValue": "Shutter speed",
    "ApertureValue": "Lens aperture",
    "BrightnessValue": "Brightness of the image",
    "ExposureBiasValue": "Exposure bias",
    "MaxApertureValue": "Maximum aperture value of the lens",
    "MeteringMode": "Metering mode used during capture",
    "LightSource": "Light source (e.g., daylight, fluorescent)",
    "FlashPixVersion": "FlashPix version supported by the image",
    "ColorSpace": "Color space information (e.g., sRGB)",
    "PixelXDimension": "Valid image width after processing",
    "PixelYDimension": "Valid image height after processing",
    "FileSource": "Type of source device (e.g., digital camera)",
    "SceneType": "Type of scene (e.g., directly photographed)",
    "CustomRendered": "Whether custom processing was applied",
    "ExposureMode": "Exposure mode (e.g., auto, manual)",
    "WhiteBalance": "White balance mode",
    "DigitalZoomRatio": "Digital zoom ratio used during capture",
    "SceneCaptureType": "Type of scene capture (e.g., portrait, landscape)",
    "GainControl": "Amount of gain control applied",
    "Contrast": "Contrast setting",
    "Saturation": "Saturation setting",
    "Sharpness": "Sharpness setting",
    "SubjectDistanceRange": "Distance to the subject",
    "InteroperabilityIndex": "Interoperability identification"
}

# This method just gets the tag, if the tag isn't defined yet, then it just returns no description
def get_info(EXIF_TAG:str):
    return EXIF_TAG_INFO.get(EXIF_TAG, "No description available for this tag")
```
Next, adding the definitions was as simple as checking if the `-e` flag was checked and querying to see if the definition existed in the current set of definitions or not. Running an example command `python main.py -i .\jpg\england-london-bridge.jpg -g -e`
provides us with:

```
==========================================================
EXIF Metadata Summary for .\jpg\england-london-bridge.jpg:
==========================================================
ImageWidth          : 4032
        --> Width of the image in pixels
ImageLength         : 3024
        --> Length of the image in pixels
GPSInfo             : 20464
        --> EXIF Offset which points to the sub image file directory
ResolutionUnit      : 2
        --> Units of measurement for XResolution and YResolution    
ExifOffset          : 241
        --> Pointer to EXIF-specific data
Make                : Google
        --> Manufacturer of the camera
Model               : Pixel 2
        --> Camera model
Software            : HDR+ 1.0.199571065z
        --> Software used to process the image
Orientation         : 1
        --> Orientation of the image
DateTime            : 2018:08:22 13:13:41
        --> Date and time when the image was last modified
YCbCrPositioning    : 1
        --> Positioning of the Y and CbCr components
XResolution         : 72.0
        --> Number of pixels per ResolutionUnit in the X direction
YResolution         : 72.0
        --> Number of pixels per ResolutionUnit in the Y direction
==========================================================
FILE SUMMARY
==========================================================
File Name           : england-london-bridge.jpg
File Size           : 595705 bytes
Image Dimensions    : 1200 x 1600 (px)
File Extension      : .jpg
==========================================================
GPS INFO
==========================================================
GPSVersionID        : b'\x02\x02\x00\x00'
        --> Version of the GPS information format
GPSLatitudeRef      : N
        --> Latitude reference (N or S)
GPSLatitude         : (51.0, 30.0, 14.78)
        --> Latitude of the image
GPSLongitudeRef     : W
        --> Longitude reference (E or W)
GPSLongitude        : (0.0, 4.0, 28.47)
        --> Longitude of the image
GPSAltitudeRef      : b'\x00'
        --> Altitude reference (0 = sea level, 1 = above sea level)
GPSAltitude         : 77.88
        --> Altitude of the image location
GPSTimeStamp        : (12.0, 13.0, 40.0)
        --> Time of GPS fix (in UTC)
GPSDOP              : 11.965
        --> Degree of precision for the GPS data
GPSProcessingMethod : b'ASCII\x00\x00\x00fused'
        --> Method used for GPS location finding
GPSDateStamp        : 2018:08:22
        --> Date of GPS fix
```
One problem for this particular approach is that there are a looooot of EXIF tags so it is likely that there is an EXIF tag with a definition that isn't added since I haven't tested this script with that many different images. 


Overall, I'd like to think this script is in a better position than it was before but as always, there is definitely room for improvement. 


