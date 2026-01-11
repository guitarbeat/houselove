import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Input } from '../ui/input';

const resources = [
  {
    title: 'Community Gardening Guide',
    description: 'A comprehensive guide to starting a community garden.',
    category: 'Gardening',
  },
  {
    title: 'Conflict Resolution Workbook',
    description: 'A workbook for resolving conflicts peacefully.',
    category: 'Conflict Resolution',
  },
  {
    title: 'Cooperative Bylaws Template',
    description: 'A template for creating cooperative bylaws.',
    category: 'Legal',
  },
];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Bolt: Memoize filtered resources to prevent unnecessary recalculations
  const filteredResources = useMemo(() => {
    return resources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Resource Library</h1>
      <div className="mb-6">
        <label
          htmlFor="resource-search"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block"
        >
          Search Resources
        </label>
        <Input
          id="resource-search"
          type="text"
          placeholder="Search for resources..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource, index) => (
            <Card key={index}>
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
      ) : (
        <div className="text-center py-12 bg-muted/20 rounded-lg border-2 border-dashed">
          <p className="text-muted-foreground">
            No resources found for "{searchTerm}".
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-primary hover:underline mt-2 text-sm font-medium"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default Resources;
