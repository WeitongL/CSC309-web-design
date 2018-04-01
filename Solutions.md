# assignment-3-unilife

## Login Tab
A login and sign up screen with username and password.  
Information is encrypted (but not HTTPS)  
User can logout after they have succesfully login.  


## Search Tab
Type in the name of a university.  
The site will retrieve the address and map along with some related information in the area.  
### Favourite universities  
Once logged in, uses can:  
 * choose to add universities to their favourites  
 * add one entry to favourites per university; only the official name of the university will be used for the entry.  
 * see and hide saved favourite universities  
 * access those univesities directly by clicking on them.  
 * delete universities from favourite.  
### Supported Assets  
So far this includes: Nearby resturants, nearby libraries, public transit and crime rate.  
Top ten nearby restaurants within 1km and top ten nearby libraries within 500m are sorted by the Google's rating system.  
On the map, red pins display nearby restaurants and blue pins display nearby libraries.  
Routes of public transits are displayed on the map on supported cities.  
Crime rates only works in US location since the APIs are based on US.  
Teleport's quality of life measurements shows as bar graph.


## About Tab
Basic information about the application. Includes a list of currently supported assets which is: address, top ten restaurants within 1km, top ten libraries within 500m, crime rates per 100000.
