import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const VisitorsView = () => {
    const { id } = useParams();
    const visitors = useSelector((state) => state.visitors);
    const [visitor, setVisitor] = useState(null);

    useEffect(() => {
        const foundVisitor = visitors.find((visitor) => visitor.id === id);
        setVisitor(foundVisitor);
    }, [id, visitors]);

    if (!visitor) {
        return <div>Loading...</div>;
    }

    return (
        <div className="visitor-view-container">
            <h1 className="visitor-view-title">Visitor Details</h1>
            <div className="visitor-view-card">
                <div className="visitor-photo">
                    {visitor.photo ? (
                        typeof visitor.photo === "string" ? (
                            <img
                                src={visitor.photo}
                                alt={`${visitor.name}`}
                                className="visitor-photo-img"                                
                            />
                        ) : (
                            <img
                                src={URL.createObjectURL(visitor.photo)}
                                alt={`${visitor.name}`}
                                className="visitor-photo-img"                                
                            />
                        )
                    ) : (
                        <div className="visitor-photo-frame">
                            <span>No Photo</span>
                        </div>
                    )}
                </div>
                <div className="visitor-info">
                    <p><strong>Name:</strong> {visitor.name}</p>
                    <p><strong>Phone:</strong> {visitor.phone}</p>
                    <p><strong>FIN:</strong> {visitor.fin}</p>
                    <p><strong>Email:</strong> {visitor.email}</p>
                    <p><strong>Address:</strong> {visitor.address}</p>
                    <p><strong>Description:</strong> {visitor.description}</p>
                </div>
                <Link to="/visitors/all" className="btn-view-visitor btn-view-visitor-secondary">
                    Back to All Visitors
                </Link>
            </div>
        </div>
    );
};

export default VisitorsView;
