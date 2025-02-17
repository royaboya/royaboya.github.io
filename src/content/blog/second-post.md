---
title: 'Updating the Exif Reader'
description: 'Second Post'
pubDatetime: 2024-12-28
#heroImage: '/blog-placeholder-2.jpg'
---
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


