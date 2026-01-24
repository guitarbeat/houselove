import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';

// Bolt: This component is memoized to prevent re-renders when the parent's
// search state changes but the filtered list remains the same.
const ResourceList = React.memo(({ resources }) => {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12" role="status">
        <p className="text-lg font-medium text-muted-foreground">No resources found</p>
        <p className="text-sm text-muted-foreground mt-1">Try adjusting your search terms</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.map((resource) => (
        <Card key={resource.id}>
          <CardHeader>
            <CardTitle>{resource.title}</CardTitle>
            <CardDescription>{resource.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{resource.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

export default ResourceList;
