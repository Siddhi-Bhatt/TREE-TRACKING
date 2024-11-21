import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import plotly.express as px
import pandas as pd


app = dash.Dash(__name__)


growth_data = pd.DataFrame({
    "Plant ID": ["Tree1", "Tree2", "Tree3"],
    "Initial Height (m)": [1.0, 2.0, 1.5],
    "Current Height (m)": [5.0, 6.5, 4.0],
    "Growth (m)": [4.0, 4.5, 2.5],
    "Estimated CO2 Sequestered (tons)": [0.4, 0.45, 0.25], 
    "Carbon Credits Earned": [0.2, 0.22, 0.12]
})


app.layout = html.Div([
    html.H1("Plant Growth and Carbon Credit Tracking Platform"),
    dcc.Dropdown(
        id='plant-selector',
        options=[{'label': pid, 'value': pid} for pid in growth_data["Plant ID"]],
        value='Tree1',
        placeholder="Select a Plant"
    ),
    html.Div(id='plant-details'),
    dcc.Graph(id='carbon-graph'),
    html.Div([
        html.H3("Add New Plant Data"),
        html.Label("Initial Height (m):"),
        dcc.Input(id='initial-height', type='number', value=0),
        html.Label("Current Height (m):"),
        dcc.Input(id='current-height', type='number', value=0),
        html.Button('Calculate Carbon Credits', id='calc-btn', n_clicks=0),
        html.Div(id='new-credit-output')
    ])
])


@app.callback(
    [Output('plant-details', 'children'),
     Output('carbon-graph', 'figure')],
    [Input('plant-selector', 'value')]
)
def update_plant_details(plant_id):
    plant = growth_data[growth_data["Plant ID"] == plant_id].iloc[0]
    details = f"""
        Plant ID: {plant_id}
        Initial Height: {plant['Initial Height (m)']} m
        Current Height: {plant['Current Height (m)']} m
        Growth: {plant['Growth (m)']} m
        Estimated CO2 Sequestered: {plant['Estimated CO2 Sequestered (tons)']} tons
        Carbon Credits Earned: {plant['Carbon Credits Earned']} credits
    """
    
    fig = px.bar(growth_data, x="Plant ID", y="Carbon Credits Earned", title="Carbon Credits Earned by Plant")
    return details, fig


@app.callback(
    Output('new-credit-output', 'children'),
    [Input('initial-height', 'value'),
     Input('current-height', 'value'),
     Input('calc-btn', 'n_clicks')]
)
def calculate_new_credits(initial_height, current_height, n_clicks):
    if n_clicks > 0:
        growth = current_height - initial_height
        co2_sequestered = growth * 0.1
        credits_earned = co2_sequestered * 0.5 
        return f"Growth: {growth:.2f} m, CO2 Sequestered: {co2_sequestered:.2f} tons, Credits Earned: {credits_earned:.2f}"
    return "Enter data and click Calculate"


if __name__ == '__main__':
    app.run_server(debug=True)
