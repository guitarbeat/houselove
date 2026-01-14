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

      {mediators.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediators.map((mediator) => (
            <Card key={mediator.id}>
              <CardHeader>
                <CardTitle>{mediator.name}</CardTitle>
                <CardDescription>{mediator.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">Contact:</span>
                  <Button variant="link" className="p-0 h-auto font-normal" asChild>
                    <a href={`mailto:${mediator.contact}`} aria-label={`Email ${mediator.name}`}>
                      {mediator.contact}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12" role="status">
          <p className="text-lg font-medium text-muted-foreground">No mediators found</p>
          <p className="text-sm text-muted-foreground mt-1">Please check back later</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Find a Mediator Near You</h2>
        <div
          className="w-full h-96 bg-muted/20 rounded-md flex items-center justify-center border-2 border-dashed border-muted"
          role="img"
          aria-label="Map placeholder showing where mediators will be located"
        >
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-medium">Interactive Map Coming Soon</p>
            <p className="text-sm">We're working on adding location services.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mediators;
