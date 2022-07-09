#!/usr/bin/env python
# coding: utf-8

# ## Note: this notebook was used for development. A script file has been created to use for implementation.

# In[1]:


# dependencies
import pandas as pd
from sqlalchemy import create_engine


# ### Store CSV into DataFrame

# In[2]:


csv_file = "data/data_clean.csv"
df = pd.read_csv(csv_file)
df.head()


# In[3]:


# check datatypes
df.dtypes


# In[4]:


# rename columns to remove capital letters and spaces
cols = {'Address': 'address',
        'County': 'county',
        'State': 'state',
        'Sale Date': 'sale_date',
        'Sale Year': 'sale_year',
        'Sale Month': 'sale_month',
        'Sale Price': 'sale_price'}
df.rename(columns = cols, inplace=True)

# preview
df.head()


# ### Connect to local database

# In[5]:


protocol = 'postgresql'
username = 'postgres'
password = 'admin'
host = 'localhost'
database_name = 'fultoncounty_db'
rds_connection_string = f'{protocol}://{username}:{password}@{host}/{database_name}'
engine = create_engine(rds_connection_string)


# ### Check for tables

# In[6]:


engine.table_names()


# ### Use pandas to load merged DataFrame into database

# In[7]:


df.to_sql(name='home_sales', con=engine, if_exists='replace', index=False)


# ### Confirm data has been added by querying the table
# * NOTE: can also check using pgAdmin

# In[8]:


pd.read_sql_query('select * from home_sales', con=engine).head()


# In[ ]:




