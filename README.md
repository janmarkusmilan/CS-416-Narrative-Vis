# UIUC CS 416 Data Visualization - Narrative Visualization

This repository contains the narrative visualization project developed for the CS 416 Data Visualization course at UIUC. This project aims to explore video game data from 1980 to 2016, analyze global earnings, observe overall trends, and determine popular platforms or genres among the general population.

## Links

- Deployment:
- Repository:
- Dataset:

## Review Criteria

### Messaging

_What is the message you are trying to communicate with the narrative visualization?_

The narrative visualization explores video game analytics, yearly trends, popular genres and platforms. The message being communicated is how video games have experienced exponential growth over the years, both in production count and sales, whether it be from technological innovation or higher development in entertainment. The growth has also calmed down in recent years, even decreasing, but a more complete dataset could present a different angle or perspective.

### Narrative Structure

_Which structure was your narrative visualization designed to follow (martini glass, interactive slide show or drop-down story)? How does your narrative visualization follow that structure? (All of these structures can include the opportunity to "drill-down" and explore. The difference is where that opportunity happens in the structure.)_

The narrative visualization is designed to follow an interactive slide show approach. The user is guided through an introduction, four pages that analyze video game data, and a general conclusion.

### Visual Structure

_What visual structure is used for each scene? How does it ensure the viewer can understand the data and navigate the scene? How does it highlight to urge the viewer to focus on the important parts of the data in each scene? How does it help the viewer transition to other scenes, to understand how the data connects to the data in other scenes?_

The visual structure used for each scene focuses on the center of the screen. The graph and and accompanying text/annotations are spaced evenly around the center of the screen, drawing the user's attention to the data. Most of scenes have the visualization on the top, with the exception of the first scene having the visualization to the left due to it's small size. Having the visualization at the top or left indicates the priority of viewing, allowing the user to get a general idea of the data before reading the analysis which is on the bottom or right of the screen. Each visualization also has tooltops to allow the user to obtain more details. The third and fourth visualization also contains user interaction to filter the earnings by region (NA/EU/JP/...) instead of just having global data, which provides the user more in-depth information.

### Scenes

_What are the scenes of your narrative visualization? How are the scenes ordered, and why?_

1. **Line Plot - Count of Video Games by Decade**

This lineplot filters by decade and analyzes the count/production of video games. This scene mainly serves as an introduction, letting the user gain a general understanding of how video game production has experienced an exponential growth with each passing year, eventually slowing down in the 2010s.

2. **Line Plot - Video Game Global Earnings by Year**

This lineplot details the global earnings of video games each year. This is essentially a follow-up to the previous graph, as it provides a more in-depth look at the data, going year-by-year rather than by decade. It also provides the specific global earnings, count of video games made each year, and the highest earning video game in the tooltip.

3. **Bar Graph - Video Game Earnings by Genre**

This bar graph illustrates all the different video game genres and their related earnings. There is user interaction with a dropdown to select the region of sales (NA/EU/JP/...) besides global sales. It also provides the specific total earnings, count of video games made per genre, and the highest earning video game related to the genre in the tooltip. This visualization deviates from the previous ones and goes in-depth regarding other categories in the data.

4. **Bar Graph - Video Game Earnings by Platform**

This bar graph illustrates all the different video game platforms and their related earnings. There is user interaction with a dropdown to select the region of sales (NA/EU/JP/...) besides global sales. It also provides the specific total earnings, count of video games made per platform, and the highest earning video game related to the platform in the tooltip. This visualization deviates from the previous ones and goes in-depth regarding other categories in the data.

### Annotations

_What template was followed for the annotations, and why that template? How are the annotations used to support the messaging? Do the annotations change within a single scene, and if so, how and why?_

The annotations in each scene are rather consistent and follow a similar structure. The dots in the line plot and the bars in the bar char all display related details upon hovering. There is also text next to each visualization providing a general analysis of it. These annotations serve to show the user the growth trend of video games over the years as well as popular genres and platforms, which supports the messaging.

### Parameters

_What are the parameters of the narrative visualization? What are the states of the narrative visualization? How are the parameters used to define the state and each scene?_

The colors are consistent across all graphs. Each year uses the same color, and if the year isn't used, it is colored from left-to-right. The size of the visualization in each scene differs, making it seem somewhat messy. The third and fourth visualization also contains user interaction to filter the earnings by region (NA/EU/JP/...) instead of just having global data, which provides the user more in-depth information.

### Triggers

_What are the triggers that connect user actions to changes of state in the narrative visualization? What affordances are provided to the user to communicate to them what options are available to them in the narrative visualization?_

The narrative visualization contains button at the bottom of the screen to allow the user to switch between scenes. The user can also return to the beginning using the home button at the top right of the screen. The third and fourth visualization also contains user interaction to filter the earnings by region (NA/EU/JP/...) instead of just having global data, which provides the user more in-depth information.
