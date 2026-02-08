import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../shared/ui/card';
import { Button } from '../../shared/ui/button';

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

const MailIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Mediators = () => {
  const [notified, setNotified] = useState(false);

  const handleNotify = () => {
    setNotified(true);
    // In a real app, this would send a request to the backend
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Mediator Directory</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediators.map((mediator) => (
            <Card key={mediator.id} className="h-full">
              <CardHeader>
                <CardTitle>{mediator.name}</CardTitle>
                <CardDescription>{mediator.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                  <a href={`mailto:${mediator.contact}`} aria-label={`Contact ${mediator.name}`}>
                    <MailIcon className="mr-2 h-4 w-4" />
                    Contact
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Find a Mediator Near You</h2>
        <div className="w-full h-80 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center text-center p-8 transition-colors hover:bg-muted/50">
          <div className="bg-background p-4 rounded-full shadow-sm mb-4">
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
              className="h-8 w-8 text-primary"
              aria-hidden="true"
            >
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" x2="9" y1="3" y2="18" />
              <line x1="15" x2="15" y1="6" y2="21" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Interactive Map Coming Soon</h3>
          <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
            We're building a tool to help you visualize mediator locations and coverage areas in your neighborhood.
          </p>
          {notified ? (
            <div className="flex items-center text-green-600 font-medium animate-in fade-in zoom-in duration-300" role="status">
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
                className="mr-2 h-4 w-4"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              You're on the list! We'll be in touch.
            </div>
          ) : (
            <Button
              onClick={handleNotify}
              variant="outline"
              className="hover:border-primary/50 hover:bg-primary/5 transition-all"
              aria-label="Get notified when map view is available"
            >
              Notify me when available
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mediators;
