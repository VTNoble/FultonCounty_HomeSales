# FultonCounty_HomeSales

![image](https://user-images.githubusercontent.com/102114721/179354040-42f0c7b0-5199-4cc1-b9d0-b6edf63ff1a5.png)

## Table of content


- API and CSV study
    - Year By Year Visualizations Line & Bar Graph 2017-2021
- Command Line Interface
- Feedback
- Contribution
    - Documenting
    - Coding
- Choropleth Map

## IP Addresses

### Heroku App:
[Heroku App](https://fultoncountyhomesales.herokuapp.com/plots)

### API Routes:
        /api/v1.0/median
        /api/v1.0/monthly_sales
        /api/v1.0/chloropleth
       
 ### Web Routes:
        /plots
        /about
        /data


## Overview
This project visualizes geocoded home sales data pulled from the Fulton County Tax Assessor. The data spans the five years from 2017 through 2021.

The data was then used to generate plots for each respective year that display the following:

 - A chloropleth map created with Leaflet showing all block groups in Fulton County shaded by median home price.
 - A line chart created with Chart.js that shows the median home price by month.
 - A bar chart created with Chart.js that shows the total home sales by month.
 - The flowchart below shows the process followed during this project, from data collection to deploying the application of interactive plots.
 
 ## Flowchart
 
 ![Flowchart](https://user-images.githubusercontent.com/102114721/179354844-73e3adeb-b2fb-471d-98e8-2cd8d68079aa.png)

 


