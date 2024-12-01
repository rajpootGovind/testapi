import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProperties, setSelectedProperties] = useState([]); // Array for selected properties

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://propertify.onrender.com/api/projects');
      setProjects(response.data);
      setIsLoading(false);
    } catch (error) {
      setError('Error fetching projects');
      setIsLoading(false);
    }
  };

  const fetchProperties = async (projectId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://propertify.onrender.com/api/properties/all?projectId=${projectId}`);
      setSelectedProperties(response.data);
      setIsLoading(false);
    } catch (error) {
      setError('Error fetching properties');
      setIsLoading(false);
    }
  };

  const handleProjectChange = (event) => {
    const projectId = event.target.value;
    setSelectedProjectId(projectId);
    if (projectId) {
      fetchProperties(projectId);
    } else {
      setSelectedProperties([]); // Clear properties when no project selected
    }
  };

  const handlePropertyAdd = (property) => {
    // Implement logic to add property to the project (consider API call or local state update)
    // Update selectedProperties in state to reflect the addition

    // Example using local state update:
    const updatedProperties = [...selectedProperties, property];
    setSelectedProperties(updatedProperties);

    // Example using API call (replace with actual API endpoint and data structure):
    axios.post(`https://propertify.onrender.com/api/projects/${selectedProjectId}/properties`, property)
      .then(() => {
        fetchProperties(selectedProjectId); // Re-fetch properties to ensure updated state
      })
      .catch((error) => {
        console.error('Error adding property:', error);
      });
  };

  const renderProperties = () => {
    if (isLoading) {
      return <p>Loading properties...</p>;
    } else if (error) {
      return <p>{error}</p>;
    } else if (!selectedProperties.length) {
      return <p>Select a project to view properties.</p>;
    }

    return (
      <div>
        <h2>Select Project Properties to add</h2>
        <table>
          <thead>
            <tr>
              <th>Post Title</th>
              <th>Type</th>
              <th>Address</th>
              <th>Price</th>
              <th>Area</th>
              <th>Action</th> 
            </tr>
          </thead>
          <tbody>
            {selectedProperties.map((property) => (
              <tr key={property._id}>
                <td>{property.post_title}</td>
                <td>{property.type_name}</td>
                <td>{property.address}</td>
                <td>{property.price}</td>
                <td>{property.area}</td>
                <td>
                  <button onClick={() => handlePropertyAdd(property)}>Add</button>
                </td>
              </tr>
            )
          
            )}
          </tbody>
        </table>
      </div>
    );
  };

  useEffect(() => {
    fetchProjects();
  }, []);
 

  return (
    <div className="App">
    <p> <strong>Note </strong>:- Added properties of project will be listed below the properties table.</p>
      <select value={selectedProjectId} onChange={handleProjectChange}>
        <option value="">Select Project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.projectId} - {project.name}
          </option>
        ))}
      </select>
     
      {renderProperties()}
    </div>
  );
}

export default App;