import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { servicesService } from '../services/api';

const ServicesList = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const data = await servicesService.getAll();
                // Filter out sub-services (those with parent_service_id)
                const topLevelServices = data.filter(service => !service.parent_service_id);
                setServices(topLevelServices || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching services:', err);
                setError('Nu s-au putut prelua serviciile');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return (
            <p>Se încarcă serviciile...</p>
        );
    }

    if (error || services.length === 0) {
        return (
            <p>Nu există servicii</p>
        );
    }

    return (
        <div className="serviceList">
            {services.map((service, index) => {
                const imageUrl = service.image 
                    ? (service.image.startsWith('http') 
                        ? service.image 
                        : `${process.env.REACT_APP_URL || 'http://localhost:5002'}${service.image}`)
                    : null;
                
                const serviceNumber = String(index + 1).padStart(2, '0');
                
                return (
                    <div className="serviceCard" key={service._id}>
                        <span className="serviceNumber">{serviceNumber}</span>
                        <NavLink to={`/servicii/${service.slug}`} className="serviceTitle">{service.title}</NavLink>
                        <span className="serviceText">{service.excerpt}</span>
                        <img 
                            className="serviceImg" 
                            src={imageUrl} 
                            alt={service.title} 
                            loading="lazy"
                            decoding="async"
                        />
                        <NavLink to={`/servicii/${service.slug}`} aria-label={`Citește mai multe despre ${service.title}`} className="arrowCTA"><span className="arrow"></span></NavLink>
                    </div>
                );
            })}
        </div>
    );
}

export default ServicesList;