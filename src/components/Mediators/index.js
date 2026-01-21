import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Button } from '../ui/button';

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
              <p>
                Contact:{' '}
                <a
                  href={`mailto:${mediator.contact}`}
                  className="text-primary hover:underline font-medium"
                  aria-label={`Email ${mediator.name}`}
                >
                  {mediator.contact}
                </a>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Find a Mediator Near You</h2>
        <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-md border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-center p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 text-muted-foreground mb-4 opacity-50"
            aria-hidden="true"
          >
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
            <line x1="9" x2="9" y1="3" y2="18" />
            <line x1="15" x2="15" y1="6" y2="21" />
          </svg>
          <h3 className="text-lg font-semibold mb-2">Map View Coming Soon</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            We're working on an interactive map to help you find mediators in your neighborhood.
          </p>
          <Button variant="outline" disabled aria-label="Notification feature coming soon">
            Notify me when available
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Mediators;
