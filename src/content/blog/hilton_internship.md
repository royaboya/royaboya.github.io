---
title: "Network Engineering Internship at Hilton"
description: "Internship experience working at Hilton"
pubDate: 2026-09-10
tags: ["AWS, Terraform, DNS, Security groups, Diagrams"]
---


This past summer, I flew out to Memphis, Tennessee to work for Hilton as an intern for the Global Network Engineering team. After a rough experience checking into the University of Memphis dorms, I attended the onboarding session with the other ten or eleven interns and began working with the team.


Initially, I was not sure what I was supposed to help assist with for the first few weeks but after the team came back from their conference trips did I start getting work to do. 

## SD-WAN Dashboard
I was tasked with my first project which was to update our datadog dashboards for monitoring our global traffic for our SD-WAN connectivity across the US, EMEA, and APAC regions.

One of my main challenges was figuring out the purpose of each widget and the purpose behind it, as well as the underlying infrastructure that was being monitored. I also had to figure out how metrics were measured in AWS and correlate that with the intended audience which so happened to be leadership.

After about a week or two of going back and forth with different timeseries graphs and EC2 health queries, I was finally done with covering all of our circuits and PoDs and thankfully, received good feedback.

## BIND DNS Diagramming & Documentation
My second project dealt with creating new network diagrams for our DNS architecture in our on-prem and off-prem environments. In addition, I also had to document how our DNS resolution flows worked to help reduce knowledge gaps between different teams and to establish a record of our infrastructure to help guide our migrations to R53.

I was really rusty with DNS at this point so I had to get a huge refresher on the entire DNS resolution hierarchy, all of the different records, and the specifics on the SOAs. Afterwards, I also had to learn about the specifics to our environment which took me a hot minute to get my head around but it clicked in soon after that. 

Another challenge I faced was figuring out how to use [draw.io](https://draw.io) to create a digestable and not overly complicated diagram. Not only that, but trying to figure out what icons and logos to use to represent different environments and servers was also a bit confusing but after a few mock-ups. 

On the bright side, I did receive positive feedback from it and one of my team members noted that my documentation was better than what some of the full timers wrote. Bang.

## Hotel Data Reconciliation
My third project involved doing some geospatial data analysis/visualization on hotels that were rolling out to [PEP](https://stories.hilton.com/releases/hotel-key-partnership), the property engagement platform that was to replace the old one. 

Without going too much into detail, the problem was that there seemed to be a disprecancy between the physical locations of domestic hotels and the region of the AWS environment that they were assigned to. My task was then to create some kind of visualizer to get a general idea of what properties needed assistance and which ones were already sound. 

Honestly, this project gave me the most headaches out of them all. I couldn't tell you how many nominatim instances I tried spinning up on docker just for some storage or memory limitations to block my way. Not only that, but not every hotel's address was returning coordinates when fed into the database so that idea was scratched pretty soon. 

After two weeks of scratching my head, Cameron, one of our senior network engineers told me about an internal database that already had the geospatial data mapped to each hotel property which would've saved me so much time and headaches earlier but I'm glad I didn't spend more time on it before finding out. 

The next step was really just trying different visualizations of all the properties on folium and creating a HTML file that we would use to render the map of PEP hotels. 

## Terraform AWS Security Groups & The Road Ahead
My in-person portion of the internship terminated on August 7th as I had to return to New York. Fortunately, I was able to get an extension to the Fall! 

More so recently, I have been working on AWS Security groups in our environment, whether it be provisioning, modifying, or even deleting them. It took me a day or two but I was able to learn how these changes were done through our CI/CD pipelines in gitlab and how the approval process worked for any pull requests. I still need to learn a lot more ports and CIDR ranges in particular to our environment but I think I am getting the hang of it.

Looking back at this whole experience, I was able to learn about many other things that I was not particularly familiar with such as: load balancers, proxies, connected room technologies, physical network standards, PCI standards, etc. I was honestly pretty surprised by how much underlying infrastructure and technology is used to help Hilton maintain its operations daily and I did not expect there to be this much stuff prior to starting. As for the next 3 months (or even 9 months if part-time), I hope to touch more of the routing or load balancing technologies. Oh, and maybe DNS too... 

