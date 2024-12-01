What we Built- We built a UI in which By the dropdown the project and select a project, we will get the properties and inside the properties by a add button we can add properties.
Process- 
Firstly we create a React app and install axios to create http request . 
First Thing we create a dropdown for projects.So we create a fetchProject function and for state management we use useState. inside fetchProject Function we create a Get request of the Project API(which is given to us). we store the response of fetch projects and update the state.By this we get the Project data.
Now by the use of map fuction we iterate the projects data and for creating a dropdown we use select tag inside select tag iterate projects by map we create options by project name & id.
Now we are going to create - by click on project we can see the properties in tabular form.
for this we create fetchProperties function. and passes a projectId . for this projectId we add a onChange Handler on select tag by this with the help of event object we get productId.
after getting productId by axios we create a Get request with Properties api in which we pass productId params. and get the properties and update state by the selectedProperties.
By the use of this selectedProperties we iterate by map and create a table by passing data like proprty.post_title,name,address,price,area. by this we get properties by clicking a project.
Now by click on property we can Add property . for we create a submit Button alongwith the table and pass a onClick handler . this handler take a property and store it on a updatedproperties array by the use of rest operator. than we update the state by passing updatedProperties in setSelectionProperties .then we create a GET req by axios and passes selectedProjectId(mange the state of <option> element).then we passes this response to a fetchProperties function for re-fetch properties.  
And The added property will be shown, below the all the properties.
we also use isLoding for add a loader. and for error handling we use try-catch.

Thank You.
