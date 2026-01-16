import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';

// Bolt: Move static data outside component to prevent reallocation on every render
const mediators = [
  {
    id: 1,
    name: 'John Doe',
    description: 'Experienced in community conflict resolution.',
    contact: 'john.doe@example.com',
  },
  {
    id: 2,
    name: 'Jane Smith',
    description: 'Specializes in housing and resource disputes.',
    contact: 'jane.smith@example.com',
  },
];

const Mediators = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mediator Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediators.map((mediator) => (
          <Card key={mediator.id}>
            <CardHeader>
              <CardTitle>{mediator.name}</CardTitle>
              <CardDescription>{mediator.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="font-medium">Contact:</span>
                <a
                  href={`mailto:${mediator.contact}`}
                  className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded px-1 -ml-1 transition-colors"
                  aria-label={`Send email to ${mediator.name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  {mediator.contact}
                </a>
              </div>
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
