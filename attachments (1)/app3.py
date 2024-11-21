import dash
from dash import dcc, html  
from dash.dependencies import Input, Output
import requests
import plotly.graph_objs as go
import pandas as pd


app = dash.Dash(__name__)

# Ambee API endpoint and key
API_KEY = 'bbf6e91170f6b46838eee39829fcec55b0a386e2c36f854e639bb945f3e3cf94'  # Replace with your actual API key
URL = 'https://api.ambeedata.com/latest/by-lat-lng?lat=12.987212&lng= 77.572201'

# Function to fetch live CO2 data (CO and other air quality parameters)
def fetch_co2_data():
    headers = {
        'x-api-key': API_KEY
    }
    response = requests.get(URL, headers=headers)
    print(response.status_code)  # Print status code for debugging
    print(response.text)  # Print the raw response for debugging
    data = response.json()
    
    # Extract CO level if available
    if 'stations' in data and len(data['stations']) > 0:
        co_level = data['stations'][0].get('CO', 'Data not available')  # Use .get() to handle missing keys
        return co_level
    else:
        return "Data not available"

# Layout for the dashboard
app.layout = html.Div([
    html.H1('Real-Time Carbon Capture Dashboard'),
    html.Div([
        html.H3('CO2 Level (ppm) in Bangalore'),  # Updated city display
        html.Div(id='co2-level'),
    ]),
    dcc.Graph(id='co2-graph'),
])

# Callback to update CO2 level and graph
@app.callback(
    [Output('co2-level', 'children'),
     Output('co2-graph', 'figure')],
    [Input('co2-level', 'children')]
)
def update_dashboard(_):
    co2_level = fetch_co2_data()
    
    if co2_level == "Data not available":
        co2_level_display = "CO2 Level: Data not available ppm"
    else:
        co2_level_display = f"CO2 Level: {co2_level} ppm"

    # Prepare data for the graph (example: tracking the CO2 level over time)
    data = {
        "Time": pd.date_range(start="2024-01-01", periods=10, freq="H"),
        "CO2 Level (ppm)": [co2_level] * 10  # For demonstration, same value for simplicity
    }
    
    df = pd.DataFrame(data)

    # Create the figure for CO2 levels
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=df["Time"], y=df["CO2 Level (ppm)"], mode='lines', name='CO2 Level'))
    fig.update_layout(title='CO2 Levels over Time',
                      xaxis_title='Time',
                      yaxis_title='CO2 Level (ppm)')
    
    # Return the updated CO2 level and graph
    return co2_level_display, fig

# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
