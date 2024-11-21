import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

data = {
    'Year': np.arange(2000, 2024),
    'Tree_Diameter_cm': np.linspace(5, 50, 24), 
    'Tree_Height_m': np.linspace(2, 30, 24),  
    'Carbon_Captured_tons': np.linspace(0.5, 25, 24)
}

df = pd.DataFrame(data)
print(df.head())  


X = df[['Tree_Diameter_cm', 'Tree_Height_m']]
y = df['Carbon_Captured_tons']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


model = LinearRegression()
model.fit(X_train, y_train)


y_pred = model.predict(X_test)


plt.scatter(y_test, y_pred)
plt.xlabel("Actual Carbon Captured (tons)")
plt.ylabel("Predicted Carbon Captured (tons)")
plt.title("Actual vs Predicted Carbon Captured")
plt.show()


new_data = np.array([[55, 32]])
predicted_carbon = model.predict(new_data)
print(f"Predicted Carbon Captured for new growth scenario: {predicted_carbon[0]:.2f} tons")
