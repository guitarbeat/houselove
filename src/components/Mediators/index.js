import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';

const Mediators = () => {
  const mediators = [
    {
      name: 'John Doe',
      description: 'Experienced in community conflict resolution.',
      contact: 'john.doe@example.com',
    },
    {
      name: 'Jane Smith',
      description: 'Specializes in housing and resource disputes.',
      contact: 'jane.smith@example.com',
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mediator Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediators.map((mediator, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{mediator.name}</CardTitle>
              <CardDescription>{mediator.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contact: {mediator.contact}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Find a Mediator Near You</h2>
        <div className="w-full h-96 bg-gray-200 rounded-md">
          {/* Map will be implemented here */}
        </div>
      </div>
    </div>
  );
};

export default Mediators;
