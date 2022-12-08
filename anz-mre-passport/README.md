# Overview
AirNZ Virtual Passport MRE is capable of displaying stamps on passport based on the progress of your avatar on its reached destinations.


# To Do
When setting up the SDK App inside the Altspace Event, the position must be set to { x: 0, y: -0.60, z:0} and its rotation is { x: 0, y: 180, z:0}.

# User Interaction
For each kiosk, there is an interactable display.
Passport Button : Displays the passport with stamps
Destination Button : Displays the list of destinations 

Destinations
- Welcome Stamp : This one is received by attending the event. This will be triggered by clicking the kiwi bird button located at the entrance (Note: This button is only visible to admins).
- Kiwi Bird and Waka : Once clicked, the 3D model will rotate on y-axis.
- Multi-purpose room, Service desk, hidden lounge : The stamp for the rooms are triggered by the colliders located on the room's entrance.

# Getting Started
1. Install node.js packages
    npm i
2. Build MRE
    npm run build
3. Run node.js application
    npm start