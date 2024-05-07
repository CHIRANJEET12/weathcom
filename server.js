const API_KEY = "561f0eb96a464d218f7101327240405";
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector(".weather");
// const fs = require("fs");

const getWeather = async (location) => {
    weather.innerHTML = `<h2>Loading...</h2>`;
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            weather.innerHTML = `<h2>Weather in ${data.location.name}, ${data.location.country}</h>
                                 <h3>Temperature: ${data.current.temp_c}°C</h3>
                                 <h3>Condition: ${data.current.condition.text}</h3>`;
                                 if (data.current.temp_c > 30) {
                                    weather.classList.add("weatherAnimation");
                                } else {
                                    weather.classList.remove("weatherAnimation");
                                }
        })
        .catch(error => {
            console.log("No such place");
            weather.innerHTML = `<h2>No such place on EARTH maybe on other planet</h2>`;
        });
};

// const logSearch = (location) => {
//     fs.appendFile("log.txt", search + "\n", (err) => {
//         if (err) throw err;
//         console.log("Search logged to log.txt");
//     });
// };

form.addEventListener("submit", function(event) {
    const searchValue = search.value;
    getWeather(searchValue);
    // logSearch(searchValue); 
    event.preventDefault();
});


var editor = ace.edit("editor");

        // Set editor options (theme, mode, etc.)
        editor.setOptions({
            theme: "ace/theme/cobalt",
            mode: "ace/mode/python",
        });

        // Set default code in the editor
        var defaultCode = 
        `#Predict weather using logistic regression.

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
        
        #THESE DATAS CAN BE CHANGED ACCOURDING TO THE COORDINATES

        test_weather = {
            #sample-value1:
            'precipitation': 0,
            'temp_max': 60,
            'temp_min': 10,
            'wind': 5.4
            #sample-value2:
            'precipitation': 50,
            'temp_max': 20,
            'temp_min': 10,
            'wind': 11.4
        }
        
        test_df=pd.DataFrame([test_weather])
        test_df
        
        model.predict(test_df) 


        output:
                    precision    recall  f1-score   support

        drizzle       0.00      0.00      0.00          14
            fog       0.00      0.00      0.00          32
           rain       0.96      0.92      0.94          192
           snow       1.00      0.12      0.22          8
            sun       0.76      1.00      0.86          193
   
        accuracy                            0.85        439
        macro avg       0.54      0.41      0.41        439
        weighted avg    0.77      0.85      0.80        439
        
        #accuracy:85%
        `;

        editor.setValue(defaultCode, 1);