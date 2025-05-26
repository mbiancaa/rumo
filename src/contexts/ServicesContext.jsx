import React, { createContext, useContext, useState, useEffect } from 'react';
import { servicesService } from '../services/api';

const ServicesContext = createContext();

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (!context) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    return context;
};

export const ServicesProvider = ({ children }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const response = await servicesService.getFooterServices();
                setServices(response);
                setError(null);
            } catch (error) {
                console.error('Error fetching services:', error);
                setError('Failed to load services');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <ServicesContext.Provider value={{ services, loading, error }}>
            {children}
        </ServicesContext.Provider>
    );
}; 