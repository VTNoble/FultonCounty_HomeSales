import numpy as np
import pandas as pd
import json

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:admin@localhost/fultoncounty_db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
# Sales = Base.classes.home_sales

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"----------------------------------<br/>"
        f"API Routes:<br/>"
        f"/api/v1.0/median<br/>"
        f"/api/v1.0/monthly_sales<br/>"
        f"/api/v1.0/chloropleth<br/>"
        f"----------------------------------<br/>"
        f"Web Routes:<br/>"
        f"/plots<br/>"
        f"/about<br/>"
        f"/data"
        
    )


@app.route("/plots")
def mapper():

    return render_template("index.html")


@app.route("/about")
def about():

    return render_template("about.html")


@app.route("/data")
def data():

    return render_template("data.html")


@app.route("/api/v1.0/median")
def median():

    # read sql table
    df1 = pd.read_sql_table('home_sales', engine)

    # group by month/year and get median price for each month
    df1 = df1.groupby(['sale_year', 'sale_month'], as_index=False).median()


    # update to only include relevant columns
    df1 = df1[['sale_year', 'sale_month', 'sale_price']]

    # values for new column to help sort by month
    values = {
        'Jan': 1,
        'Feb': 2,
        'Mar': 3,
        'Apr': 4,
        'May': 5,
        'Jun': 6,
        'Jul': 7,
        'Aug': 8,
        'Sep': 9,
        'Oct': 10,
        'Nov': 11,
        'Dec': 12
    }

    # add new column with numeric values for month
    df1['month_id'] = df1['sale_month'].map(values)

    df1 = df1.to_dict(orient='records')

    # create new dataframe sorted by month
    df1_sorted = sorted(df1, key= lambda x: (x['sale_year'], x['month_id']))

    return jsonify(df1_sorted)


@app.route("/api/v1.0/monthly_sales")
def monthly_sales():

    # read sql table
    df2 = pd.read_sql_table('home_sales', engine)

    # group by month/year and get total sales for each month
    df2 = df2.groupby(['sale_year', 'sale_month'], as_index=False).count()

    # update to only include relevant columns
    df2 = df2[['sale_year', 'sale_month', 'sale_price']]

    # values for new column to help sort by month
    values = {
        'Jan': 1,
        'Feb': 2,
        'Mar': 3,
        'Apr': 4,
        'May': 5,
        'Jun': 6,
        'Jul': 7,
        'Aug': 8,
        'Sep': 9,
        'Oct': 10,
        'Nov': 11,
        'Dec': 12
    }

    # add new column with numeric values for month
    df2['month_id'] = df2['sale_month'].map(values)

    # convert to dictionary
    df2 = df2.to_dict(orient='records')

    # create new dataframe sorted by month
    df2_sorted = sorted(df2, key= lambda x: (x['sale_year'], x['month_id']))

    return jsonify(df2_sorted)


@app.route("/api/v1.0/chloropleth")
def chloropleth():

    file = open('static/data/Fulton_bg2.geojson')
    myvar = json.load(file)
    file.close()


    

    # # read sql table
    # df3 = pd.read_sql_table('home_sales', engine)

    # # group by block/year and get median price for each block
    # df3 = df3.groupby(['block', 'sale_year'], as_index=False).median()

    # # update to only include relevant columns
    # df3 = df3[['sale_year', 'block', 'sale_price']]

    # # convert to dictionary
    # df3 = df3.to_dict(orient='records')

    return jsonify(myvar)


if __name__ == '__main__':
    app.run(debug=True)
