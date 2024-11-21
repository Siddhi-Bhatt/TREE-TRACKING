import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

np.random.seed(42)
years = np.arange(2000, 2024)
tree_diameter = np.linspace(5, 50, 24) + np.random.normal(0, 2, 24)  
tree_height = np.linspace(2, 30, 24) + np.random.normal(0, 1, 24)  
carbon_captured = np.linspace(0.5, 25, 24) + np.random.normal(0, 2, 24) 
ndvi_values = np.clip(np.linspace(0.3, 0.9, 24) + np.random.normal(0, 0.05, 24), 0, 1) 

data = {
    'Year': years,
    'Tree_Diameter_cm': tree_diameter,
    'Tree_Height_m': tree_height,
    'NDVI': ndvi_values,
    'Carbon_Captured_tons': carbon_captured
}
df = pd.DataFrame(data)
print(df.head())

X = df[['Tree_Diameter_cm', 'Tree_Height_m', 'NDVI']]
y = df['Carbon_Captured_tons']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)


y_pred = rf_model.predict(X_test)

plt.figure(figsize=(10, 6))
sns.scatterplot(x=y_test, y=y_pred)
plt.xlabel("Actual Carbon Captured (tons)")
plt.ylabel("Predicted Carbon Captured (tons)")
plt.title("Actual vs Predicted Carbon Captured (Random Forest Model)")
plt.show()


mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"Mean Squared Error: {mse:.2f}")
print(f"R^2 Score: {r2:.2f}")

new_data = np.array([[55, 32, 0.85]])  
predicted_carbon = rf_model.predict(new_data.reshape(1, -1))
print(f"Predicted Carbon Captured for new growth scenario: {predicted_carbon[0]:.2f} tons")
