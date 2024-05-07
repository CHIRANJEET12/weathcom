import pandas as pd

df= pd.read_csv("seattle-weather.csv")
df.head()

df.isna().sum()

x=df.drop(columns=["date","weather"])
y=df["weather"]

from sklearn.model_selection import train_test_split

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=42)

from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(x_train,y_train)

prediction=model.predict(x_test)

from sklearn.metrics import classification_report

print(classification_report(y_test,prediction))


test_weather = {
    'precipitation': 0,
    'temp_max': 60,
    'temp_min': 10,
    'wind': 5.4
}

test_df=pd.DataFrame([test_weather])
test_df
model.predict(test_df)   